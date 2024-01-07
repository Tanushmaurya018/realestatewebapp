// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestateapp-5216b.firebaseapp.com",
  projectId: "realestateapp-5216b",
  storageBucket: "realestateapp-5216b.appspot.com",
  messagingSenderId: "917143504513",
  appId: "1:917143504513:web:5439280b3df5329455ef80",
  measurementId: "G-948WMEVNNT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
