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
      return setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: serverTimestamp()
      });
    })
    .then(() => {
      console.log('사용자 정보 Firestore에 저장 성공');
    })
    .catch(error => {
      console.error('회원 가입 오류 또는 Firestore 저장 오류:', error.message);
    });
}
