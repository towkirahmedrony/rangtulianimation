import admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    // লগ দিয়ে চেক করা (Vercel Logs-এ দেখা যাবে)
    console.log("Checking Firebase Config...");
    console.log("Project ID exists:", !!process.env.FIREBASE_PROJECT_ID);
    console.log("Client Email exists:", !!process.env.FIREBASE_CLIENT_EMAIL);
    console.log("Private Key exists:", !!process.env.FIREBASE_PRIVATE_KEY);

    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
      databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com`,
    });
    console.log("✅ Firebase Admin Initialized Successfully");
  } catch (error: any) {
    console.error("❌ FIREBASE_AUTH_ERROR:", error.message);
    if (error.message.includes("private_key")) {
      console.error("🚨 চোর ধরা পড়েছে: আপনার Private Key-র ফরম্যাট ভুল!");
    }
  }
}

export const adminDb = admin.database();
