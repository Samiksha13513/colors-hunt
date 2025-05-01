// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFRrIvimQ-4Crc4BTYfPLqAkEqLu-7vjM",
  authDomain: "colors-hunt.firebaseapp.com",
  projectId: "colors-hunt",
  storageBucket: "colors-hunt.firebasestorage.app",
  messagingSenderId: "431377190644",
  appId: "1:431377190644:web:567689d05c1274a6da98a1",
  measurementId: "G-XY2ZWYK5YQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);