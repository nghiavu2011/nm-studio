import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configuration for project: nmstudio-b4105
// !IMPORTANT: You must replace "AIzaSyANDicHlWH5ODqa2XRb1-Ypq3sBrYb6oBY" with the actual Web API Key from Firebase Console
// Go to Project Settings -> General -> Your apps -> SDK Setup and Configuration
const firebaseConfig = {
    apiKey: "YAIzaSyANDicHlWH5ODqa2XRb1-Ypq3sBrYb6oBY", // <--- PASTE YOUR API KEY HERE
    authDomain: "nmstudio-b4105.firebaseapp.com",
    projectId: "nmstudio-b4105",
    storageBucket: "nmstudio-b4105.firebasestorage.app",
    messagingSenderId: "", // Optional for this use case
    appId: "" // Optional for this use case
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
