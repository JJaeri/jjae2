import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB_n7mY46TKoO0ka3AGHxGsaeTQBIVA1hA",
    authDomain: "poom-8712e.firebaseapp.com",
    projectId: "poom-8712e",
    storageBucket: "poom-8712e.appspot.com",
    messagingSenderId: "185126036966",
    appId: "1:185126036966:web:1e59c4a38fba494c0d6227",
    measurementId: "G-YMD7V81JG7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

