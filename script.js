document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('emmyForm');
    const submitBtn = document.getElementById('submitBtn');
    const status = document.getElementById('status');
    const judgeNameInput = document.getElementById('judgeName');

    // Save judge name to localStorage
    judgeNameInput.addEventListener('input', function() {
        localStorage.setItem('emmyJudgeName', this.value);
    });

    // Load saved judge name
    const savedName = localStorage.getItem('emmyJudgeName');
    if (savedName) {
        judgeNameInput.value = savedName;
    }

    // Auto-save selections to localStorage
    form.addEventListener('change', function(e) {
        if (e.target.type === 'radio') {
            const selections = {};
            const formData = new FormData(form);
            for (let [key, value] of formData.entries()) {
                selections[key] = value;
            }
            localStorage.setItem('emmySelections', JSON.stringify(selections));
        }
    });

    // Load saved selections
    const savedSelections = localStorage.getItem('emmySelections');
    if (savedSelections) {
        try {
            const selections = JSON.parse(savedSelections);
            for (const [name, value] of Object.entries(selections)) {
                const radio = form.querySelector(`input[name="${name}"][value="${value}"]`);
                if (radio) {
                    radio.checked = true;
                }
            }
        } catch (e) {
            console.error('Error loading saved selections:', e);
        }
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const judgeName = judgeNameInput.value.trim();
        if (!judgeName) {
            showStatus('Please enter your name', 'error');
            judgeNameInput.focus();
            return;
        }

        // Check if all categories are filled
        const categories = [
            'drama_series', 'drama_actress', 'drama_actor', 'drama_supporting_actress', 'drama_supporting_actor',
            'comedy_series', 'comedy_actress', 'comedy_actor', 'comedy_supporting_actress', 'comedy_supporting_actor',
            'limited_series', 'limited_actress', 'limited_actor', 'variety_series'
        ];

        const formData = new FormData(form);
        const missingCategories = [];
        
        categories.forEach(category => {
            if (!formData.get(category)) {
                missingCategories.push(category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
            }
        });

        if (missingCategories.length > 0) {
            showStatus(`Please make selections for: ${missingCategories.join(', ')}`, 'error');
            return;
        }

        submitBtn.disabled = true;
        showStatus('Submitting scorecard...', 'loading');

        try {
            // Collect all the data
            const scores = {
                judgeName,
                timestamp: new Date().toISOString(),
                selections: {}
            };

            categories.forEach(category => {
                scores.selections[category] = formData.get(category);
            });

            // For now, just show success and log the data
            // In a real implementation, you'd send this to Google Sheets
            console.log('Emmy Scorecard Submission:', scores);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            showStatus('✅ Scorecard submitted successfully!', 'success');
            
            // Clear saved selections
            localStorage.removeItem('emmySelections');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
        } catch (error) {
            console.error('Submission error:', error);
            showStatus('❌ Error submitting scorecard. Please try again.', 'error');
        } finally {
            submitBtn.disabled = false;
        }
    });

    function showStatus(message, type) {
        status.textContent = message;
        status.className = `status-message ${type}`;
        
        // Clear status after 5 seconds for non-success messages
        if (type !== 'success') {
            setTimeout(() => {
                status.textContent = '';
                status.className = 'status-message';
            }, 5000);
        }
    }

    // Progress tracking
    function updateProgress() {
        const totalCategories = 14;
        const completed = form.querySelectorAll('input[type="radio"]:checked').length;
        const percentage = Math.round((completed / totalCategories) * 100);
        
        // You could add a progress bar here if desired
        document.title = `Emmy Scorecard (${completed}/${totalCategories})`;
    }

    // Update progress on change
    form.addEventListener('change', updateProgress);
    updateProgress(); // Initial call
});