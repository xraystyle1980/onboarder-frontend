// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';  // Add this import

const firebaseConfig = {
  apiKey: "AIzaSyBu8y5TEYar34-ZHpSBjS5n5C4RNPgcss0",
  authDomain: "onboarder-design.firebaseapp.com",
  projectId: "onboarder-design",
  storageBucket: "onboarder-design.firebasestorage.app",
  messagingSenderId: "218539776530",
  appId: "1:218539776530:web:898008a414832d35fa96cb",
  measurementId: "G-JQMXK5R53P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);  // Add this line

// Export all instances
export { app, db, auth };  // Add auth to exports