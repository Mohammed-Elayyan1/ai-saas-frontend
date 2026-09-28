// auth.js - وحدة المصادقة لمنصة NexusAI

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// الحصول على كائن المصادقة المعرّف مسبقاً في المشروع
const auth = window.auth;

/**
 * تسجيل حساب جديد بالبريد الإلكتروني وكلمة المرور
 */
export function registerWithEmail(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("تم إنشاء الحساب بنجاح:", user.email);
            return user;
        })
        .catch((error) => {
            console.error("خطأ في إنشاء الحساب:", error.message);
            throw error;
        });
}

/**
 * تسجيل الدخول بالبريد الإلكتروني وكلمة المرور
 */
export function loginWithEmail(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("تم تسجيل الدخول بنجاح:", user.email);
            return user;
        })
        .catch((error) => {
            console.error("خطأ في تسجيل الدخول:", error.message);
            throw error;
        });
}

/**
 * تسجيل الدخول عبر حساب Google
 */
export function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log("تم تسجيل الدخول عبر جوجل بنجاح:", user.email);
            return user;
        })
        .catch((error) => {
            console.error("خطأ في تسجيل الدخول عبر جوجل:", error.message);
            throw error;
        });
}

/**
 * تسجيل الخروج
 */
export function logoutUser() {
    return signOut(auth);
}

// ربط أزرار الواجهة تلقائياً عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    // 1. ربط زر جوجل (تأكد أن الـ id للزر في HTML هو googleLoginBtn)
    const googleBtn = document.getElementById("googleLoginBtn");
    if (googleBtn) {
        googleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            loginWithGoogle()
                .then(() => {
                    alert("مرحباً بك! تم تسجيل الدخول عبر Google بنجاح.");
                    // يمكنك هنا تحديث الواجهة لإظهار لوحة التحكم
                })
                .catch((error) => {
                    alert("حدث خطأ: " + error.message);
                });
        });
    }
});