// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzyCRh0PEw-NoF71XFYi6Wun1uEXwlc8U",
  authDomain: "sshreservationapp-3300.firebaseapp.com",
  projectId: "sshreservationapp-3300",
  storageBucket: "sshreservationapp-3300.appspot.com",
  messagingSenderId: "774521674321",
  appId: "1:774521674321:web:e7f262756eace7ea933670",
  measurementId: "G-6W8SG1C83Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };