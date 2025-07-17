import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfnkGgU9SkYtKR3YuMemgCImuU1o9baF8",
  authDomain: "anime-tracker-backend-437f0.firebaseapp.com",
  projectId: "anime-tracker-backend-437f0",
  storageBucket: "anime-tracker-backend-437f0.firebasestorage.app",
  messagingSenderId: "680771807292",
  appId: "1:680771807292:web:34ce3d8f2e9f2742907b39",
  databaseURL:"https://anime-tracker-backend-437f0-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
//Use persistent auth state
const auth = getAuth(app);
const database = getDatabase(app); 
export { auth, database };