// auth.js - تسجيل الدخول عبر Google (حقيقي) لمنصة NexusAI
//
// يعتمد على window.auth المُعرّف في firebase-config.js (يجب تحميله أولاً).
// البريد وكلمة السر العاديين يمرّان عبر السيرفر الخاص بك (main.py)
// مباشرة من index.html، وليس من هذا الملف.

import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

function getAuthInstance() {
    if (!window.auth) {
        throw new Error("Firebase auth غير مُهيّأ. تأكد من تحميل firebase-config.js أولاً.");
    }
    return window.auth;
}

/**
 * يفتح نافذة تسجيل الدخول عبر Google ويرجع المستخدم الحقيقي بعد نجاح الدخول.
 * المستدعي (index.html) يأخذ user.getIdToken() ويبعته للسيرفر للتحقق منه.
 */
export function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(getAuthInstance(), provider).then(
        (result) => result.user
    );
}

/**
 * تسجيل الخروج من جلسة Google (إضافة لحذف الجلسة من السيرفر بـ index.html).
 */
export function logoutGoogle() {
    if (!window.auth) return Promise.resolve();
    return signOut(window.auth);
}

// إتاحة الدوال لاستدعائها من السكربت العادي (غير module) داخل index.html
window.AuthAPI = { loginWithGoogle, logoutGoogle };

document.getElementById("googleBtn")?.addEventListener("click", async () => {
    try {
        const user = await loginWithGoogle();
        if (user) {
            window.location.href = '/dashboard'; // صفحة التوجيه بعد النجاح
        }
    } catch (error) {
        console.log("خطأ في تسجيل الدخول عبر قوقل:", error);
    }
});