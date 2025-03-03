import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBYOWzDEWi9JcdSMuZ9sQYIhbjqmn-J6T4",
    authDomain: "diabetes-decoded.firebaseapp.com",
    projectId: "diabetes-decoded",
    storageBucket: "diabetes-decoded.appspot.com",
    messagingSenderId: "978627285159",
    appId: "1:978627285159:web:b94771e13800528b85cb82",
    measurementId: "G-YJ65JN84ZS",
    databaseurl: "https://diabetes-decoded-default-rtdb.firebaseio.com/"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };