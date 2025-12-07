# Firebase Setup Guide for Workout Tracker

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `workout-tracker` (or any name you prefer)
4. Disable Google Analytics (optional, not needed for this project)
5. Click **"Create project"**

## Step 2: Register Your Web App

1. In your Firebase project, click the **Web icon** (`</>`) to add a web app
2. Register app with nickname: `Workout Tracker`
3. **Do NOT** check "Also set up Firebase Hosting" (we're using GitHub Pages)
4. Click **"Register app"**
5. **Copy the Firebase configuration** (you'll need this!)

It will look like this:
```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc..."
};
```

## Step 3: Enable Firestore Database

1. In Firebase Console, click **"Firestore Database"** in the left menu
2. Click **"Create database"**
3. Select **"Start in test mode"** (we'll secure it later)
4. Choose a Cloud Firestore location (closest to you)
5. Click **"Enable"**

## Step 4: Enable Anonymous Authentication

1. In Firebase Console, click **"Authentication"** in the left menu
2. Click **"Get started"**
3. Go to the **"Sign-in method"** tab
4. Click on **"Anonymous"**
5. Toggle **"Enable"** and click **"Save"**

## Step 5: Configure Firestore Security Rules

1. Go to **"Firestore Database"** → **"Rules"** tab
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /workouts/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click **"Publish"**

## Step 6: Update Your Code

1. Open `firebase-config.js`
2. Replace the `firebaseConfig` object with YOUR configuration from Step 2:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

## Step 7: Test Locally

1. Open `index.html` in your browser
2. Open browser console (F12) - you should see "User authenticated: [some-id]"
3. Mark some exercises as complete
4. Refresh the page - your progress should persist!

## Step 8: Deploy to GitHub

```bash
cd "/home/bridgerkeddington/Desktop/Workout Plan"
git add .
git commit -m "Add Firebase integration"
git push origin main
```

## Step 9: Verify Firebase is Working

1. Go to Firebase Console → **Firestore Database** → **Data** tab
2. You should see a `workouts` collection
3. Inside, you'll see documents with your user IDs and workout data

## Features You Now Have:

✅ **Cloud Sync** - Your data is saved in the cloud
✅ **Multi-Device** - Access from phone, tablet, computer (same browser)
✅ **Anonymous Auth** - No sign-up required, automatic user ID
✅ **Offline Fallback** - Falls back to localStorage if Firebase fails
✅ **Auto Migration** - Existing localStorage data migrates to Firebase

## Troubleshooting

**Issue**: Can't see Firebase data
- Check browser console for errors
- Verify firebaseConfig is correctly pasted
- Ensure Firestore and Anonymous Auth are enabled

**Issue**: "Permission denied" error
- Check Firestore security rules match Step 5
- Make sure you're allowing anonymous users

**Issue**: Data not syncing
- Open browser console, look for authentication message
- Check Firebase Console → Authentication → Users tab for anonymous users

## Notes

- Firebase free tier: 50K reads/20K writes per day (more than enough!)
- Each browser gets its own anonymous user ID
- To sync across browsers, you'd need to add email/password auth (can add later)
- Your data is private - each user only sees their own workout data

---

**Need help?** Check the [Firebase Documentation](https://firebase.google.com/docs/web/setup)
