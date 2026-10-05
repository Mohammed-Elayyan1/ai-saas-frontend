// auth.js - تسجيل الدخول عبر Google (حقيقي) لمنصة NexusAI
//
// يعتمد على window.auth المُعرّف في firebase-config.js (يجب تحميله أولاً).
// البريد وكلمة السر العاديين يمرّان عبر السيرفر الخاص بك (main.py)
// مباشرة من index.html، وليس من هذا الملف.

import {
    GoogleAuthProvider,
    signInWithRedirect,
    getRedirectResult,
    signOut,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

function getAuthInstance() {
    if (!window.auth) {
        throw new Error("Firebase auth غير مُهيّأ. تأكد من تحميل firebase-config.js أولاً.");
    }
    return window.auth;
}

/**
 * يبدأ عملية تسجيل الدخول عبر Google باستخدام إعادة التوجيه (Redirect).
 */
export function loginWithGoogle() {
    const auth = getAuthInstance();
    const provider = new GoogleAuthProvider();
    return signInWithRedirect(auth, provider);
}

/**
 * تسجيل الخروج من جلسة Google.
 */
export function logoutGoogle() {
    if (!window.auth) return Promise.resolve();
    return signOut(window.auth);
}

// معالجة النتيجة فور عودة المستخدم من جوجل وتحميل الصفحة
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const auth = getAuthInstance();
        const result = await getRedirectResult(auth);
        if (result && result.user) {
            const user = result.user;
            const token = await user.getIdToken();
            console.log("تم تسجيل الدخول بنجاح، الـ Token:", token);

            // التوجيه لصفحة الـ dashboard بعد نجاح الدخول
            window.location.href = '/dashboard';
        }
    } catch (error) {
        console.log("خطأ في تسجيل الدخول عبر قوقل:", error);
    }
});

// إتاحة الدوال لاستدعائها من السكربت العادي (غير module) داخل index.html
window.AuthAPI = { loginWithGoogle, logoutGoogle };

document.getElementById("googleBtn")?.addEventListener("click", () => {
    loginWithGoogle();
});