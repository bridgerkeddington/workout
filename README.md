# 💪 6-Day Workout Plan

A modern, dark-themed static web application for tracking your complete 6-day workout routine. Built with vanilla HTML, CSS, and JavaScript.

![Workout Plan Preview](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🎯 Features

- **6-Day Training Split**: Comprehensive workout covering Chest/Triceps, Back/Biceps, Lower Body (Quads), Shoulders, Lower Body (Glutes/Hams), and Core
- **Interactive Day Navigation**: Easy switching between workout days with keyboard shortcuts (1-6 keys)
- **Progress Tracking**: Click exercises to mark them complete, with progress automatically saved
- **Progress Bar**: Visual indicator showing completion percentage for each day
- **Dark Mode Design**: Sleek, modern interface optimized for gym environments
- **Responsive Layout**: Works perfectly on mobile, tablet, and desktop devices
- **LocalStorage Persistence**: Your progress is saved automatically in your browser

## 🏋️ Workout Structure

- **Total Training Days**: 6 per week
- **Ab Work**: 5 days per week (Days 1, 3, 4, 5, 6)
- **Rest Days**: None (Day 6 is active recovery)
- **Nutrition**: 300-400 calorie deficit with 160-195g protein daily
- **Sleep**: 7-9 hours nightly

## 🚀 Quick Start

### View Locally

1. Clone this repository:
```bash
git clone https://github.com/yourusername/workout-plan.git
cd workout-plan
```

2. Open `index.html` in your browser:
```bash
# On Mac
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

### Deploy to GitHub Pages

1. **Create a new repository** on GitHub (or use an existing one)

2. **Push your code**:
```bash
git init
git add .
git commit -m "Initial commit: Add workout plan website"
git branch -M main
git remote add origin https://github.com/yourusername/workout-plan.git
git push -u origin main
```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click on **Settings** → **Pages**
   - Under **Source**, select `main` branch
   - Click **Save**
   - Your site will be live at: `https://yourusername.github.io/workout-plan/`

## 📱 Usage

### Navigation
- Click on day buttons (Day 1-6) to switch between workouts
- Use keyboard shortcuts: Press `1`, `2`, `3`, `4`, `5`, or `6` keys

### Tracking Progress
- Click on any exercise row to mark it as complete
- A checkmark (✓) will appear next to completed exercises
- Progress bar shows your completion percentage
- All progress is automatically saved to your browser

### Resetting Progress
- Scroll to the bottom of the page
- Click the "🔄 Reset All Progress" button
- Confirm to clear all tracked exercises

## 📁 Project Structure

```
workout-plan/
├── index.html      # Main HTML structure
├── styles.css      # Dark theme styling and responsive design
├── script.js       # Interactive features and progress tracking
└── README.md       # This file
```

## 🎨 Customization

### Change Colors
Edit the CSS variables in `styles.css`:

```css
:root {
    --bg-dark: #0a0e1a;
    --accent-primary: #3b82f6;
    --accent-secondary: #8b5cf6;
    /* ... more variables */
}
```

### Modify Exercises
Edit the workout tables in `index.html` to add, remove, or change exercises.

### Adjust Tracking
Customize the progress tracking behavior in `script.js`.

## 🔧 Technologies Used

- **HTML5**: Semantic markup for workout structure
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **JavaScript (ES6+)**: Interactive features and localStorage for persistence
- **No frameworks**: Pure vanilla JavaScript for lightweight performance

## 📊 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 💡 Tips

- **Progressive Overload**: Track weights in RYSE app and aim to increase every 1-2 weeks
- **Consistency**: Complete all 6 days for optimal results
- **Recovery**: Prioritize sleep (7-9 hours) and nutrition (160-195g protein)
- **Mobile Access**: Add this page to your home screen for quick gym access

## 🤝 Contributing

Feel free to fork this project and customize it for your own workout routine!

## 📧 Contact

Created by [@yourusername](https://github.com/yourusername)

---

**💯 Start this plan immediately and repeat the cycle continuously.**

Built with 💪 for gains | Track your progress consistently
