// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

// Your web app's Firebase configuration
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

// signUp 함수 정의
function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user;
            console.log('회원 가입 성공:', user);

            // Firestore에 사용자 정보 저장
            setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                createdAt: serverTimestamp()
            });
        })
        .catch(error => {
            console.error('회원 가입 오류:', error.message);
        });
}

// 이벤트 리스너 추가
document.getElementById('signup-button').addEventListener('click', signUp);
