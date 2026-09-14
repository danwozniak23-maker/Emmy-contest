// Configure your Google Sheet ID here
const SHEET_ID = '1TUbgqecRxGAJT8ckPPq7PsbmVMpvlFa4LPGqVdh-wuU';

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
        // Get list of all sheet names first to find judge sheets
        const sheetListUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=Sheet1`;
        
        // List all your judge names here - add more as needed
        const judgeSheets = ['Staci', 'Dan']; // Add more judge names as you create tabs
        const judgesData = [];
        
        // Fetch each judge's picks
        for (const judgeName of judgeSheets) {
            try {
                const judgeUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${judgeName}`;
                const judgeResponse = await fetch(judgeUrl);
                const judgeCSV = await judgeResponse.text();
                
                if (judgeCSV && !judgeCSV.includes('Error') && !judgeCSV.includes('Invalid')) {
                    const judgeData = parseVerticalSheet(judgeCSV);
                    if (judgeData.picks && Object.keys(judgeData.picks).length > 0) {
                        judgesData.push({
                            name: judgeName,
                            picks: judgeData.picks,
                            categories: judgeData.categories
                        });
                    }
                }
            } catch (err) {
                console.log(`Could not load sheet for ${judgeName}:`, err);
            }
        }
        
        // Fetch Winners sheet (same structure as judge sheets, Column B has winners)
        let winnersData = {};
        try {
            const winnersUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=Winners`;
            const winnersResponse = await fetch(winnersUrl);
            const winnersCSV = await winnersResponse.text();
            
            if (!winnersCSV.includes('Error') && !winnersCSV.includes('Invalid')) {
                const winnersSheet = parseVerticalSheet(winnersCSV);
                winnersData = winnersSheet.picks; // Column B in Winners tab
            }
        } catch (err) {
            console.log('Winners sheet not found or not ready yet');
        }
        
        // Calculate scores
        const results = calculateVerticalScores(judgesData, winnersData);
        
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
    } finally {
        refreshBtn.disabled = false;
        refreshBtn.textContent = '↻ Refresh';
    }
}

function parseVerticalSheet(csv) {
    const lines = csv.split('\n').filter(line => line.trim());
    const picks = {};
    const categories = [];
    let currentCategory = '';
    
    for (const line of lines) {
        const columns = line.split(',').map(col => col.replace(/"/g, '').trim());
        const col1 = columns[0] || '';
        const col2 = columns[1] || '';
        
        // Check if this is a category header (starts with "Outstanding")
        if (col1.startsWith('Outstanding')) {
            currentCategory = col1;
            categories.push(currentCategory);
        } else if (col1 && currentCategory && col2) {
            // This is a nominee with a pick in column B
            // Check for checkmark or actual selection
            if (col2 === '✓' || col2 === 'x' || col2 === 'X' || col2.length > 0) {
                picks[currentCategory] = col1; // The nominee they picked
            }
        }
    }
    
    return { picks, categories };
}

function calculateVerticalScores(judgesData, winnersData) {
    if (!judgesData.length) {
        throw new Error('No judge data found');
    }
    
    const judgeResults = [];
    
    judgesData.forEach(judge => {
        let correctPicks = 0;
        let totalCategories = 0;
        const categoryDetails = {};
        
        // Check each category where judge made a pick
        Object.entries(judge.picks).forEach(([category, pick]) => {
            const actualWinner = winnersData[category];
            totalCategories++;
            
            let isCorrect = false;
            if (actualWinner && actualWinner.trim() !== '') {
                // Compare the judge's pick with the actual winner
                isCorrect = pick.toLowerCase().trim() === actualWinner.toLowerCase().trim();
                if (isCorrect) correctPicks++;
            }
            
            categoryDetails[category] = {
                pick: pick,
                winner: actualWinner || 'TBD',
                correct: isCorrect && actualWinner
            };
        });
        
        const percentage = totalCategories > 0 ? Math.round((correctPicks / totalCategories) * 100) : 0;
        
        judgeResults.push({
            name: judge.name,
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
        categories: judgesData[0]?.categories || []
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