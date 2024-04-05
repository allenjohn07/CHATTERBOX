// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfzDSYX9vo79NdC5klPbFldVi0z2JFQzA",
  authDomain: "chatterbox-695b0.firebaseapp.com",
  projectId: "chatterbox-695b0",
  storageBucket: "chatterbox-695b0.appspot.com",
  messagingSenderId: "356904592902",
  appId: "1:356904592902:web:fe6a26de5e3813b77a8587"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)