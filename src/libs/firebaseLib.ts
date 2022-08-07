// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_X7I8GuY74_rYB-o1I9MU-8YyDD-BX60",
  authDomain: "movie-review-de0ac.firebaseapp.com",
  projectId: "movie-review-de0ac",
  storageBucket: "movie-review-de0ac.appspot.com",
  messagingSenderId: "524609336248",
  appId: "1:524609336248:web:b17ef8b21f6fdd74a2d54d",
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth();

export { app, firebaseAuth };
