// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAO7r8SrodxCjL7rpTV-95jq5a0XJY5EEY",
    authDomain: "workout-9ca84.firebaseapp.com",
    projectId: "workout-9ca84",
    storageBucket: "workout-9ca84.firebasestorage.app",
    messagingSenderId: "1053688591650",
    appId: "1:1053688591650:web:2887bfa59717589f17617b",
    measurementId: "G-MVB6HSWWWP"
};

// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc, updateDoc, deleteField } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js';

// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc, updateDoc, deleteField } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

let currentUser = null;

// Check if user is already signed in
onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        console.log("User signed in:", user.email);
        updateAuthUI(true);
        // Migrate localStorage data to Firebase
        migrateLocalStorageToFirebase();
        // Load user's workout data
        loadWorkoutData();
    } else {
        console.log("No user signed in");
        currentUser = null;
        updateAuthUI(false);
        window.useLocalStorage = true;
    }
});

// Google Sign In
export async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, provider);
        currentUser = result.user;
        console.log("Signed in successfully:", currentUser.email);
        return true;
    } catch (error) {
        console.error("Sign in error:", error);
        alert("Failed to sign in. Using offline mode.");
        window.useLocalStorage = true;
        return false;
    }
}

// Sign Out
export async function signOutUser() {
    try {
        await signOut(auth);
        currentUser = null;
        console.log("Signed out successfully");
        window.useLocalStorage = true;
    } catch (error) {
        console.error("Sign out error:", error);
    }
}

// Update Auth UI
function updateAuthUI(isSignedIn) {
    const authButton = document.getElementById('auth-button');
    const userInfo = document.getElementById('user-info');
    
    if (!authButton) return;
    
    if (isSignedIn && currentUser) {
        authButton.textContent = '🚪 Sign Out';
        authButton.onclick = () => {
            signOutUser().then(() => location.reload());
        };
        if (userInfo) {
            userInfo.textContent = `👤 ${currentUser.email}`;
            userInfo.style.display = 'block';
        }
    } else {
        authButton.textContent = '🔐 Sign In with Google';
        authButton.onclick = () => {
            signInWithGoogle().then(() => location.reload());
        };
        if (userInfo) {
            userInfo.textContent = '📴 Offline Mode';
            userInfo.style.display = 'block';
        }
    }
}

// Save exercise completion to Firebase
export async function saveExerciseCompletion(exerciseKey, isCompleted) {
    if (!currentUser || window.useLocalStorage) {
        // Fallback to localStorage
        if (isCompleted) {
            localStorage.setItem(exerciseKey, 'completed');
        } else {
            localStorage.removeItem(exerciseKey);
        }
        return;
    }

    try {
        const userDoc = doc(db, 'workouts', currentUser.uid);
        
        if (isCompleted) {
            await setDoc(userDoc, {
                [exerciseKey]: 'completed'
            }, { merge: true });
        } else {
            await updateDoc(userDoc, {
                [exerciseKey]: deleteField()
            });
        }
    } catch (error) {
        console.error("Error saving to Firebase:", error);
        // Fallback to localStorage
        if (isCompleted) {
            localStorage.setItem(exerciseKey, 'completed');
        } else {
            localStorage.removeItem(exerciseKey);
        }
    }
}

// Load all workout data from Firebase
async function loadWorkoutData() {
    if (!currentUser) return;

    try {
        const userDoc = doc(db, 'workouts', currentUser.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
            const data = docSnap.data();
            // Apply completion status to exercises
            Object.keys(data).forEach(key => {
                if (data[key] === 'completed') {
                    const parts = key.split('-exercise-');
                    if (parts.length === 2) {
                        const dayId = parts[0];
                        const exerciseIndex = parts[1];
                        markExerciseComplete(dayId, exerciseIndex);
                    }
                }
            });
            updateProgressStats();
        }
    } catch (error) {
        console.error("Error loading from Firebase:", error);
    }
}

// Check if exercise is completed
export async function isExerciseCompleted(exerciseKey) {
    if (!currentUser || window.useLocalStorage) {
        return localStorage.getItem(exerciseKey) === 'completed';
    }

    try {
        const userDoc = doc(db, 'workouts', currentUser.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
            return docSnap.data()[exerciseKey] === 'completed';
        }
        return false;
    } catch (error) {
        console.error("Error checking completion:", error);
        return localStorage.getItem(exerciseKey) === 'completed';
    }
}

// Save current day to Firebase
export async function saveCurrentDay(dayNumber) {
    if (!currentUser || window.useLocalStorage) {
        localStorage.setItem('currentDay', dayNumber);
        return;
    }

    try {
        const userDoc = doc(db, 'workouts', currentUser.uid);
        await setDoc(userDoc, {
            currentDay: dayNumber
        }, { merge: true });
    } catch (error) {
        console.error("Error saving current day:", error);
        localStorage.setItem('currentDay', dayNumber);
    }
}

// Get current day from Firebase
export async function getCurrentDay() {
    if (!currentUser || window.useLocalStorage) {
        return localStorage.getItem('currentDay') || '1';
    }

    try {
        const userDoc = doc(db, 'workouts', currentUser.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists() && docSnap.data().currentDay) {
            return docSnap.data().currentDay;
        }
        return '1';
    } catch (error) {
        console.error("Error getting current day:", error);
        return localStorage.getItem('currentDay') || '1';
    }
}

// Reset all progress
export async function resetAllProgress() {
    if (!currentUser || window.useLocalStorage) {
        localStorage.clear();
        return;
    }

    try {
        const userDoc = doc(db, 'workouts', currentUser.uid);
        await setDoc(userDoc, {});
        localStorage.clear();
    } catch (error) {
        console.error("Error resetting progress:", error);
        localStorage.clear();
    }
}

// Migrate existing localStorage data to Firebase
async function migrateLocalStorageToFirebase() {
    if (!currentUser) return;

    const localData = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        localData[key] = value;
    }

    if (Object.keys(localData).length > 0) {
        try {
            const userDoc = doc(db, 'workouts', currentUser.uid);
            await setDoc(userDoc, localData, { merge: true });
            console.log("Migrated localStorage to Firebase");
        } catch (error) {
            console.error("Error migrating data:", error);
        }
    }
}

// Helper function to mark exercise as complete in the UI
function markExerciseComplete(dayId, exerciseIndex) {
    const day = document.getElementById(dayId);
    if (!day) return;

    const rows = day.querySelectorAll('.table-row:not(.table-header):not(.finisher)');
    const row = rows[exerciseIndex];
    
    if (row && !row.classList.contains('completed')) {
        row.classList.add('completed');
        const exerciseName = row.querySelector('.exercise-name');
        if (exerciseName && !exerciseName.querySelector('.checkmark')) {
            const checkmark = document.createElement('span');
            checkmark.className = 'checkmark';
            checkmark.textContent = ' ✓';
            checkmark.style.color = '#10b981';
            checkmark.style.fontWeight = 'bold';
            checkmark.style.marginLeft = '0.5rem';
            exerciseName.appendChild(checkmark);
        }
    }
}

export { auth, db, currentUser };
