import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";

// \n এবং ইনভার্টেড কমা (") রিমুভ করার জন্য আপডেট করা হয়েছে
const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n").replace(/"/g, "");

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: firebasePrivateKey,
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

export const adminDb = getDatabase();
