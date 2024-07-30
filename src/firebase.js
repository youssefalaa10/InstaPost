// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8JMTPFu88SAeWPyWBBZo-8AGVAQKNUcE",
  authDomain: "insta-post-f18fb.firebaseapp.com",
  projectId: "insta-post-f18fb",
  storageBucket: "insta-post-f18fb.appspot.com",
  messagingSenderId: "17517922111",
  appId: "1:17517922111:web:e64598b5fc658258caf58a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const storage = getStorage();

export const db = getFirestore(app);

