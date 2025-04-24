import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, set, update, push } from "firebase/database";

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

// For NextJS SSR safety, check if we're in the browser before initializing
const getFirebaseApp = () => {
  // Check if app is already initialized to avoid duplicate initialization
  try {
    return initializeApp(firebaseConfig);
  } catch (error) {
    // If the error is about the app already existing, return the existing app
    if (error.code === 'app/duplicate-app') {
      console.log("Firebase app already exists, using existing app");
      return initializeApp();
    }
    console.error("Firebase initialization error:", error);
    throw error;
  }
};

// Only initialize Firebase when in the browser
const app = typeof window !== 'undefined' ? getFirebaseApp() : null;

// Get services with safety checks for SSR
let db = null;
let auth = null;
let realtimeDb = null;

if (app) {
  console.log("Firebase initialized successfully!");
  // Get Firestore instance
  db = getFirestore(app);
  
  // Get Auth instance
  auth = getAuth(app);
  
  // Get Realtime Database instance
  realtimeDb = getDatabase(app);
}

// Returns the current user's display name, or null if not signed in
export function getCurrentUserDisplayName() {
  if (!auth) return null;
  const user = auth.currentUser;
  return user && user.displayName ? user.displayName : null;
}

// Function to fetch tasks from Realtime Database
export async function fetchTasks() {
  if (!realtimeDb) return [];
  
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

// Function to add a new task to the database
export async function addTask(taskName) {
  if (!realtimeDb) throw new Error("Database not initialized");
  
  try {
    const currentTasks = await fetchTasks();
    
    let maxId = 0;
    if (Array.isArray(currentTasks)) {
      currentTasks.forEach(task => {
        if (task.id > maxId) maxId = task.id;
      });
    }
    
    // Create new task object
    const newTask = {
      id: maxId + 1,
      name: taskName,
      checked: false
    };
    
    // Add to task list
    let updatedTasks = [];
    if (Array.isArray(currentTasks)) {
      updatedTasks = [...currentTasks, newTask];
    } else {
      updatedTasks = [newTask];
    }
    
    // Update in Firebase
    const tasksRef = ref(realtimeDb, 'taskList');
    await set(tasksRef, updatedTasks);
    
    return newTask;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
}

// Function to toggle task completion status
export async function toggleTaskCompletion(taskId) {
  if (!realtimeDb) throw new Error("Database not initialized");
  
  try {
    const currentTasks = await fetchTasks();
    
    if (!Array.isArray(currentTasks)) {
      throw new Error("Tasks not found or invalid format");
    }
    
    // Find the task and toggle its checked status
    const updatedTasks = currentTasks.map(task => {
      if (task.id === taskId) {
        return { ...task, checked: !task.checked };
      }
      return task;
    });
    
    // Update in Firebase
    const tasksRef = ref(realtimeDb, 'taskList');
    await set(tasksRef, updatedTasks);
    
    return updatedTasks;
  } catch (error) {
    console.error("Error toggling task completion:", error);
    throw error;
  }
}

export { app, db, auth, realtimeDb };