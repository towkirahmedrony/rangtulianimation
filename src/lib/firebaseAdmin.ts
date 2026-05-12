import * as admin from "firebase-admin";

const formatPrivateKey = (key?: string) => {
  if (!key) return undefined;
  // Vercel-এ সেভ হওয়া টেক্সট \n কে আসল লাইন ব্রেকে কনভার্ট করা
  return key.replace(/\\n/g, "\n");
};

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // প্রাইভেট কি ফরম্যাট করা হচ্ছে
        privateKey: formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY),
      }),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
    console.log("✅ Firebase Admin Initialized Successfully");
  } catch (error) {
    console.error("❌ Firebase Admin Initialization Error:", error);
  }
}

export const adminDb = admin.database();
export const adminAuth = admin.auth();
