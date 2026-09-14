const SHEET_ID = '1TUbgqecRxGAJT8ckPPq7PsbmVMpvlFa4LPGqVdh-wuU';
const JUDGE_SHEETS = ['Staci', 'Dan'];

document.addEventListener('DOMContentLoaded', loadResults);

async function fetchSheet(sheetName) {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
    const res = await fetch(url);
    const text = await res.text();
    // Google wraps JSON in /*O_o*/\ngoogle.visualization.Query.setResponse({...});
    const json = JSON.parse(text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\)/)[1]);
    return json.table.rows;
}

function parseSheet(rows) {
    // Each row has cells: col 0 = nominee/category name, col 1 = marker
    const picks = {};
    let currentCategory = '';

    for (const row of rows) {
        const col1 = row.c[0]?.v?.toString().trim() || '';
        const col2 = row.c[1]?.v?.toString().trim() || '';

        if (col1.startsWith('Outstanding')) {
            currentCategory = col1;
        } else if (col1 && currentCategory && col2 === 'Winner') {
            picks[currentCategory] = col1;
        }
    }
    return picks;
}

async function loadResults() {
    const loading = document.getElementById('loadingMessage');
    const container = document.getElementById('resultsContainer');
    const errorEl = document.getElementById('errorMessage');
    const lastUpdated = document.getElementById('lastUpdated');
    const refreshBtn = document.getElementById('refreshBtn');

    loading.style.display = 'block';
    container.style.display = 'none';
    errorEl.style.display = 'none';
    refreshBtn.disabled = true;
    refreshBtn.textContent = '↻ Loading...';

    try {
        // Fetch winners
        const winnersRows = await fetchSheet('Winners');
        const winners = parseSheet(winnersRows);

        // Fetch each judge
        const judgeResults = [];
        for (const name of JUDGE_SHEETS) {
            const rows = await fetchSheet(name);
            const picks = parseSheet(rows);

            let correct = 0;
            let total = 0;
            const details = {};

            for (const [category, pick] of Object.entries(picks)) {
                total++;
                const actualWinner = winners[category] || '';
                const isCorrect = actualWinner !== '' && pick === actualWinner;
                if (isCorrect) correct++;
                details[category] = { pick, winner: actualWinner || 'TBD', correct: isCorrect };
            }

            const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
            judgeResults.push({ name, score: pct, correct, total, details });
        }

        // Sort highest score first
        judgeResults.sort((a, b) => b.score - a.score);

        displayResults(judgeResults);
        lastUpdated.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
        loading.style.display = 'none';
        container.style.display = 'block';

    } catch (err) {
        console.error(err);
        loading.style.display = 'none';
        errorEl.style.display = 'block';
        errorEl.querySelector('p').textContent = `Error: ${err.message}`;
    } finally {
        refreshBtn.disabled = false;
        refreshBtn.textContent = '↻ Refresh';
    }
}

function displayResults(judges) {
    const container = document.getElementById('resultsContainer');

    const medals = ['🥇', '🥈', '🥉'];
    const rankClasses = ['first-place', 'second-place', 'third-place'];

    let html = `<div class="leaderboard"><h2>🏆 Final Rankings</h2><div class="judge-results">`;

    judges.forEach((judge, i) => {
        html += `
            <div class="judge-card ${rankClasses[i] || ''}">
                <div class="judge-info">
                    <div class="judge-rank">${medals[i] || i + 1}</div>
                    <div class="judge-name">${judge.name}</div>
                </div>
                <div class="judge-score">
                    <div class="score-percentage">${judge.score}%</div>
                    <div class="score-details">${judge.correct}/${judge.total} correct</div>
                </div>
            </div>`;
    });

    html += `</div></div>`;

    // Category breakdown for all judges
    judges.forEach(judge => {
        if (judge.total === 0) return;
        html += `<div class="category-breakdown"><h3>🎯 ${judge.name}'s Picks</h3><div class="category-results">`;

        for (const [category, d] of Object.entries(judge.details)) {
            const icon = d.winner === 'TBD' ? '⏳' : (d.correct ? '✅' : '❌');
            html += `
                <div class="category-result">
                    <div class="category-name">${icon} ${category}</div>
                    <div class="category-stats">
                        <span>Picked: ${d.pick}</span>
                        ${d.winner !== 'TBD' && !d.correct ? `<span>Winner: ${d.winner}</span>` : ''}
                    </div>
                </div>`;
        }

        html += `</div></div>`;
    });

    container.innerHTML = html;
}

setInterval(loadResults, 30000);
