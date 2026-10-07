import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAbnVN9fxCP3JdMqyqolyEi1_14V4TaE7c",
    authDomain: "nexusai-app-4061f.firebaseapp.com",
    projectId: "nexusai-app-4061f",
    storageBucket: "nexusai-app-4061f.firebasestorage.app",
    messagingSenderId: "418229896645",
    appId: "1:418229896645:web:2a27e8dda727787972b7ac",
    measurementId: "G-C1JB01NGQ9"
};

// تهيئة Firebase (بدون Firestore — غير مستخدم حاليًا بالمنصة)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ربطها بنافذة المتصفح لاستخدامها من auth.js
window.auth = auth;