// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCODlyZt50HuI0aATAQko3is7eGO9M9gro",
  authDomain: "fexixo-adeb6.firebaseapp.com",
  projectId: "fexixo-adeb6",
  storageBucket: "fexixo-adeb6.firebasestorage.app",
  messagingSenderId: "87713372568",
  appId: "1:87713372568:web:ba0829a0be32a3409173ed",
  measurementId: "G-N15DJVDC5R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage }; 