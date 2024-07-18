import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('signup-button').addEventListener('click', signUp);
});

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

