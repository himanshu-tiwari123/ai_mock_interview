// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { get } from "http";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYuGN_G77ZcybVamIdBjAHxM2SWS_BoAo",
  authDomain: "ai-recruiter-91801.firebaseapp.com",
  projectId: "ai-recruiter-91801",
  storageBucket: "ai-recruiter-91801.firebasestorage.app",
  messagingSenderId: "832007835055",
  appId: "1:832007835055:web:002594656564fb974df35a",
  measurementId: "G-X73CH6TBZ3"
};

// Initialize Firebase
const app =!getApps.length ? initializeApp(firebaseConfig):getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);