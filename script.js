// Day Navigation
document.addEventListener('DOMContentLoaded', () => {
    const dayButtons = document.querySelectorAll('.day-btn');
    const workoutDays = document.querySelectorAll('.workout-day');
    
    // Function to switch days
    function switchDay(dayNumber) {
        // Update buttons
        dayButtons.forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-day="${dayNumber}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        // Update workout displays
        workoutDays.forEach(day => day.classList.remove('active'));
        const activeDay = document.getElementById(`day-${dayNumber}`);
        if (activeDay) {
            activeDay.classList.add('active');
        }
        
        // Save to localStorage
        localStorage.setItem('currentDay', dayNumber);
        
        // Scroll to top of workout
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Add click handlers to day buttons
    dayButtons.forEach(button => {
        button.addEventListener('click', () => {
            const dayNumber = button.getAttribute('data-day');
            switchDay(dayNumber);
        });
    });
    
    // Load saved day or default to day 1
    const savedDay = localStorage.getItem('currentDay') || '1';
    switchDay(savedDay);
    
    // Keyboard navigation (1-6 keys)
    document.addEventListener('keydown', (e) => {
        if (e.key >= '1' && e.key <= '6') {
            switchDay(e.key);
        }
    });
    
    // Add exercise completion tracking
    addExerciseTracking();
    
    // Add progress statistics
    updateProgressStats();
});

// Exercise Completion Tracking
function addExerciseTracking() {
    const tableRows = document.querySelectorAll('.table-row:not(.finisher)');
    
    tableRows.forEach((row, index) => {
        // Skip header rows
        if (row.classList.contains('table-header')) return;
        
        const exerciseName = row.querySelector('.exercise-name');
        if (!exerciseName) return;
        
        const dayId = row.closest('.workout-day').id;
        const storageKey = `${dayId}-exercise-${index}`;
        
        // Check if exercise was previously completed
        if (localStorage.getItem(storageKey) === 'completed') {
            row.classList.add('completed');
            addCheckmark(exerciseName);
        }
        
        // Add click handler for completion toggle
        row.style.cursor = 'pointer';
        row.addEventListener('click', () => {
            row.classList.toggle('completed');
            
            if (row.classList.contains('completed')) {
                localStorage.setItem(storageKey, 'completed');
                if (!exerciseName.querySelector('.checkmark')) {
                    addCheckmark(exerciseName);
                }
            } else {
                localStorage.removeItem(storageKey);
                const checkmark = exerciseName.querySelector('.checkmark');
                if (checkmark) checkmark.remove();
            }
            
            updateProgressStats();
        });
    });
}

function addCheckmark(element) {
    const checkmark = document.createElement('span');
    checkmark.className = 'checkmark';
    checkmark.textContent = ' ✓';
    checkmark.style.color = '#10b981';
    checkmark.style.fontWeight = 'bold';
    checkmark.style.marginLeft = '0.5rem';
    element.appendChild(checkmark);
}

// Update Progress Statistics
function updateProgressStats() {
    const currentDay = document.querySelector('.workout-day.active');
    if (!currentDay) return;
    
    const dayId = currentDay.id;
    const exercises = currentDay.querySelectorAll('.table-row:not(.table-header):not(.finisher)');
    const completedExercises = Array.from(exercises).filter(ex => ex.classList.contains('completed'));
    
    const progressPercent = exercises.length > 0 
        ? Math.round((completedExercises.length / exercises.length) * 100) 
        : 0;
    
    // Update or create progress indicator
    let progressBar = document.querySelector('.progress-indicator');
    if (!progressBar) {
        progressBar = createProgressIndicator();
        const dayHeader = currentDay.querySelector('.day-header');
        dayHeader.appendChild(progressBar);
    }
    
    const progressFill = progressBar.querySelector('.progress-fill');
    const progressText = progressBar.querySelector('.progress-text');
    
    progressFill.style.width = `${progressPercent}%`;
    progressText.textContent = `${completedExercises.length}/${exercises.length} exercises completed`;
    
    // Celebrate completion
    if (progressPercent === 100 && exercises.length > 0) {
        progressBar.classList.add('complete');
        setTimeout(() => progressBar.classList.remove('complete'), 2000);
    }
}

function createProgressIndicator() {
    const container = document.createElement('div');
    container.className = 'progress-indicator';
    container.style.cssText = `
        margin-top: 1rem;
        background: var(--bg-card);
        padding: 1rem;
        border-radius: 0.75rem;
        border: 1px solid var(--border);
    `;
    
    const text = document.createElement('div');
    text.className = 'progress-text';
    text.style.cssText = `
        font-size: 0.9rem;
        color: var(--text-secondary);
        margin-bottom: 0.5rem;
        font-weight: 600;
    `;
    
    const barContainer = document.createElement('div');
    barContainer.style.cssText = `
        width: 100%;
        height: 8px;
        background: var(--bg-dark);
        border-radius: 4px;
        overflow: hidden;
    `;
    
    const barFill = document.createElement('div');
    barFill.className = 'progress-fill';
    barFill.style.cssText = `
        height: 100%;
        background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
        border-radius: 4px;
        transition: width 0.5s ease;
        width: 0%;
    `;
    
    barContainer.appendChild(barFill);
    container.appendChild(text);
    container.appendChild(barContainer);
    
    return container;
}

// Add CSS for completed exercises
const style = document.createElement('style');
style.textContent = `
    .table-row.completed {
        opacity: 0.6;
        text-decoration: line-through;
    }
    
    .table-row.completed:hover {
        opacity: 0.8;
    }
    
    .progress-indicator.complete {
        animation: celebrate 0.5s ease;
    }
    
    @keyframes celebrate {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .table-row {
        user-select: none;
    }
`;
document.head.appendChild(style);

// Reset Progress Button
function addResetButton() {
    const footer = document.querySelector('footer');
    const resetBtn = document.createElement('button');
    resetBtn.textContent = '🔄 Reset All Progress';
    resetBtn.style.cssText = `
        margin-top: 1rem;
        padding: 0.75rem 1.5rem;
        background: var(--bg-card);
        color: var(--text-secondary);
        border: 2px solid var(--border);
        border-radius: 0.5rem;
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: 600;
        transition: all 0.3s ease;
    `;
    
    resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all progress?')) {
            localStorage.clear();
            location.reload();
        }
    });
    
    resetBtn.addEventListener('mouseenter', () => {
        resetBtn.style.background = 'var(--bg-card-hover)';
        resetBtn.style.borderColor = 'var(--accent-primary)';
        resetBtn.style.color = 'var(--text-primary)';
    });
    
    resetBtn.addEventListener('mouseleave', () => {
        resetBtn.style.background = 'var(--bg-card)';
        resetBtn.style.borderColor = 'var(--border)';
        resetBtn.style.color = 'var(--text-secondary)';
    });
    
    footer.appendChild(resetBtn);
}

addResetButton();
