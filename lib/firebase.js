import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBYOWzDEWi9JcdSMuZ9sQYIhbjqmn-J6T4",
    authDomain: "diabetes-decoded.firebaseapp.com",
    projectId: "diabetes-decoded",
    storageBucket: "diabetes-decoded",
    messagingSenderId: "978627285159",
    appId: "1:978627285159:web:b94771e13800528b85cb82",
    measurementId: "G-YJ65JN84ZS",
    databaseurl: "https://diabetes-decoded-default-rtdb.firebaseio.com/"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Returns the current user's display name, or null if not signed in
export function getCurrentUserDisplayName() {
  const user = auth.currentUser;
  return user && user.displayName ? user.displayName : null;
}

export { app, db, auth };