import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('login-button').addEventListener('click', signIn);
});

function signIn() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user;
            console.log('로그인 성공:', user);
        })
        .catch(error => {
            console.error('로그인 오류:', error.message);
        });
}

