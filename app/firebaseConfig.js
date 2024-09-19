// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Import getStorage from Firebase

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi5-AExrDgWQq1xZciZcgUnOVNTN-GwRA",
  authDomain: "bidswap360.firebaseapp.com",
  projectId: "bidswap360",
  storageBucket: "bidswap360.appspot.com",
  messagingSenderId: "493742969130",
  appId: "1:493742969130:web:1a21e9cd0816b49348ce53",
  measurementId: "G-BLJ2DVER4N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app); // Initialize and export Firebase Storage

// Export the storage object so it can be used in other parts of your app
export { storage };
