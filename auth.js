// auth.js - وحدة المصادقة لمنصة NexusAI

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// الحصول على كائن المصادقة المعرّف مسبقاً
const auth = window.auth;

/**
 * تسجيل حساب جديد بالبريد الإلكتروني وكلمة المرور
 */
export function registerWithEmail(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("تم إنشاء الحساب بنجاح:", userCredential.user.email);
            return userCredential.user;
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
            console.log("تم تسجيل الدخول بنجاح:", userCredential.user.email);
            return userCredential.user;
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
            console.log("تم تسجيل الدخول عبر جوجل بنجاح:", result.user.email);
            return result.user;
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
    const googleBtn = document.getElementById("googleLoginBtn");

    if (googleBtn) {
        googleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            console.ج("تم الضغط على زر جوجل بنجاح!");

            loginWithGoogle()
                .then((user) => {
                    alert("تم تسجيل الدخول عبر Google بنجاح: " + user.email);
                    // يمكنك هنا توجيه المستخدم للوحة التحكم
                })
                .catch((error) => {
                    alert("فشل تسجيل الدخول عبر جوجل: " + error.message);
                });
        });
    } else {
        console.warn("تنبيه: لم يتم العثور على عنصر يحمل المعرف googleLoginBtn في الصفحة الحالية.");
    }
});