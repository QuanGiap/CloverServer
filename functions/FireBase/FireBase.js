const admin = require("firebase-admin");
const { initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");

// Initialize Firebase Admin SDK with credentials (only for real deployment)
const app = initializeApp();

const db = getFirestore();
const storage = getStorage();
const auth = getAuth();
// Use Firestore Emulator if running locally
if (process.env.FIRESTORE_EMULATOR_HOST) {
  console.log("Using Firestore Emulator "+process.env.FIRESTORE_EMULATOR_HOST);
  // db.useEmulator("localhost", 8080);
}
if(process.env.FIREBASE_AUTH_EMULATOR_HOST){
  console.log("Using Auth Emulator");
  // auth.useEmulator("http://localhost:9099");
}
// Use Storage Emulator if running locally
if (process.env.FIREBASE_STORAGE_EMULATOR_HOST) {
  console.log("Using Storage Emulator");
  // storage.useEmulator("localhost", 9199);
}

module.exports = { db, storage,app,auth };
