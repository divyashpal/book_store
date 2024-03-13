// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7X7gn0xNSW9E2ipjJsNUnlSF642fxzI8",
  authDomain: "mern-book-inventory-75398.firebaseapp.com",
  projectId: "mern-book-inventory-75398",
  storageBucket: "mern-book-inventory-75398.appspot.com",
  messagingSenderId: "371765734313",
  appId: "1:371765734313:web:c98dae671df16d1ba572b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;