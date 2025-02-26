// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgljYYom0E1t4qsIZ6udtm2Jp7LUGdouE",
  authDomain: "plantscan-dhbw-on23.firebaseapp.com",
  projectId: "plantscan-dhbw-on23",
  storageBucket: "plantscan-dhbw-on23.firebasestorage.app",
  messagingSenderId: "853608435719",
  appId: "1:853608435719:web:e36da9430ae18e295a9aa2",
  measurementId: "G-TD83J3PHLC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);