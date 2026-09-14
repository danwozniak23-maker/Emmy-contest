// Configure your Google Sheet ID here
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';

document.addEventListener('DOMContentLoaded', function() {
    loadResults();
});

async function loadResults() {
    const loadingMessage = document.getElementById('loadingMessage');
    const resultsContainer = document.getElementById('resultsContainer');
    const errorMessage = document.getElementById('errorMessage');
    const lastUpdated = document.getElementById('lastUpdated');
    const refreshBtn = document.getElementById('refreshBtn');
    
    // Show loading state
    loadingMessage.style.display = 'block';
    resultsContainer.style.display = 'none';
    errorMessage.style.display = 'none';
    refreshBtn.disabled = true;
    refreshBtn.textContent = '↻ Loading...';
    
    try {
        // Fetch judges data (Sheet1 or "Judges")
        const judgesUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=Judges`;
        const judgesResponse = await fetch(judgesUrl);
        const judgesCSV = await judgesResponse.text();
        
        // Fetch winners data (Sheet2 or "Winners") 
        const winnersUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=Winners`;
        const winnersResponse = await fetch(winnersUrl);
        const winnersCSV = await winnersResponse.text();
        
        // Parse the data
        const judgesData = parseCSV(judgesCSV);
        const winnersData = parseCSV(winnersCSV);
        
        // Calculate scores
        const results = calculateScores(judgesData, winnersData);
        
        // Display results
        displayResults(results);
        
        // Update timestamp
        lastUpdated.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
        
        // Hide loading, show results
        loadingMessage.style.display = 'none';
        resultsContainer.style.display = 'block';
        
    } catch (error) {
        console.error('Error loading results:', error);
        
        // Show error state
        loadingMessage.style.display = 'none';
        errorMessage.style.display = 'block';
        
        if (error.message.includes('SHEET_ID')) {
            errorMessage.querySelector('p').textContent = 'Google Sheet ID not configured. Please update the SHEET_ID in results.js';
        }
    } finally {
        refreshBtn.disabled = false;
        refreshBtn.textContent = '↻ Refresh';
    }
}

function parseCSV(csv) {
    const lines = csv.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];
    
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.replace(/"/g, '').trim());
        if (values.length >= headers.length) {
            const row = {};
            headers.forEach((header, index) => {
                row[header] = values[index] || '';
            });
            data.push(row);
        }
    }
    
    return data;
}

function calculateScores(judgesData, winnersData) {
    if (!judgesData.length || !winnersData.length) {
        throw new Error('No data found in sheets');
    }
    
    // Create winners lookup (assuming winners sheet has Category and Winner columns)
    const winners = {};
    winnersData.forEach(row => {
        if (row.Category && row.Winner) {
            winners[row.Category.toLowerCase().replace(/\s+/g, '_')] = row.Winner;
        }
    });
    
    // Calculate scores for each judge
    const judgeResults = [];
    
    judgesData.forEach(judge => {
        const judgeName = judge.Judge || judge.Name || 'Unknown Judge';
        if (!judgeName || judgeName === 'Unknown Judge') return;
        
        let correctPicks = 0;
        let totalCategories = 0;
        const categoryDetails = {};
        
        // Check each category column
        Object.keys(judge).forEach(column => {
            if (column.toLowerCase() === 'judge' || column.toLowerCase() === 'name') return;
            
            const categoryKey = column.toLowerCase().replace(/\s+/g, '_');
            const judgesPick = judge[column];
            const actualWinner = winners[categoryKey];
            
            if (judgesPick && actualWinner) {
                totalCategories++;
                const isCorrect = judgesPick.trim().toLowerCase() === actualWinner.trim().toLowerCase();
                if (isCorrect) correctPicks++;
                
                categoryDetails[column] = {
                    pick: judgesPick,
                    winner: actualWinner,
                    correct: isCorrect
                };
            }
        });
        
        const percentage = totalCategories > 0 ? Math.round((correctPicks / totalCategories) * 100) : 0;
        
        judgeResults.push({
            name: judgeName,
            score: percentage,
            correctPicks,
            totalCategories,
            categoryDetails
        });
    });
    
    // Sort by score descending
    judgeResults.sort((a, b) => b.score - a.score);
    
    return {
        judges: judgeResults,
        categories: Object.keys(winners)
    };
}

function displayResults(results) {
    const container = document.getElementById('resultsContainer');
    
    if (!results.judges.length) {
        container.innerHTML = `
            <div class="error-card">
                <h2>No Results Found</h2>
                <p>Make sure your Google Sheet has data in the correct format.</p>
            </div>
        `;
        return;
    }
    
    let html = `
        <div class="leaderboard">
            <h2>🏆 Final Rankings</h2>
            <div class="judge-results">
    `;
    
    results.judges.forEach((judge, index) => {
        const rank = index + 1;
        let rankClass = '';
        let rankEmoji = '';
        
        if (rank === 1) {
            rankClass = 'first-place';
            rankEmoji = '🥇';
        } else if (rank === 2) {
            rankClass = 'second-place';
            rankEmoji = '🥈';
        } else if (rank === 3) {
            rankClass = 'third-place';
            rankEmoji = '🥉';
        }
        
        html += `
            <div class="judge-card ${rankClass}">
                <div class="judge-info">
                    <div class="judge-rank">${rankEmoji || rank}</div>
                    <div class="judge-name">${judge.name}</div>
                </div>
                <div class="judge-score">
                    <div class="score-percentage">${judge.score}%</div>
                    <div class="score-details">${judge.correctPicks}/${judge.totalCategories} correct</div>
                </div>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    // Add category breakdown for the winner
    if (results.judges.length > 0) {
        const winner = results.judges[0];
        html += `
            <div class="category-breakdown">
                <h3>🎯 ${winner.name}'s Winning Picks</h3>
                <div class="category-results">
        `;
        
        Object.entries(winner.categoryDetails).forEach(([category, details]) => {
            const icon = details.correct ? '✅' : '❌';
            html += `
                <div class="category-result">
                    <div class="category-name">${icon} ${category.replace(/_/g, ' ')}</div>
                    <div class="category-stats">
                        <span>Picked: ${details.pick}</span>
                        ${!details.correct ? `<span>Winner: ${details.winner}</span>` : ''}
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

// Auto-refresh every 30 seconds
setInterval(loadResults, 30000);