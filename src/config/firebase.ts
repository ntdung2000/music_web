// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyahW0-_mAxxz3L2_0RwHWAFD3CiwIF8Q",
  authDomain: "ionic-music-app-963c1.firebaseapp.com",
  projectId: "ionic-music-app-963c1",
  storageBucket: "ionic-music-app-963c1.appspot.com",
  messagingSenderId: "88811004595",
  appId: "1:88811004595:web:7e6d82e2a0b2b3b1a886c6",
  measurementId: "G-W3R6DQ0PHL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const getAppAuth = getAuth(app)
export const getAppFirestore = getFirestore(app);
export const getAppStorage = getStorage(app);