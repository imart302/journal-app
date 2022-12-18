// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKiXBi2lBS9Q5Bn9Zn9Vh6difNJad5N1g",
  authDomain: "react-cursos-b6b16.firebaseapp.com",
  projectId: "react-cursos-b6b16",
  storageBucket: "react-cursos-b6b16.appspot.com",
  messagingSenderId: "1011035631473",
  appId: "1:1011035631473:web:a5abc4f480f9655146d0d0"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);