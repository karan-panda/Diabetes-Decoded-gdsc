import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBYOWzDEWi9JcdSMuZ9sQYIhbjqmn-J6T4",
    authDomain: "diabetes-decoded.firebaseapp.com",
    projectId: "diabetes-decoded",
    storageBucket: "diabetes-decoded",
    messagingSenderId: "978627285159",
    appId: "1:978627285159:web:b94771e13800528b85cb82",
    measurementId: "G-YJ65JN84ZS",
    databaseURL: "https://diabetes-decoded-default-rtdb.firebaseio.com/"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const realtimeDb = getDatabase(app);

// Returns the current user's display name, or null if not signed in
export function getCurrentUserDisplayName() {
  const user = auth.currentUser;
  return user && user.displayName ? user.displayName : null;
}

// Function to fetch tasks from Realtime Database
export async function fetchTasks() {
  try {
    const tasksRef = ref(realtimeDb, 'taskList');
    const snapshot = await get(tasksRef);
    
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No tasks found in database");
      return [];
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}

export { app, db, auth, realtimeDb };