import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Replace these placeholders with your actual Firebase configuration from the Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyCwywGKqc4hw-GCKYnNnPT8OHXY3orN8mo",
    authDomain: "review-a3744.firebaseapp.com",
    projectId: "review-a3744",
    storageBucket: "review-a3744.firebasestorage.app",
    messagingSenderId: "560723445999",
    appId: "1:560723445999:web:4bd50986440ef14f98731a"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
