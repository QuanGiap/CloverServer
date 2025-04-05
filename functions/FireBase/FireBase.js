const {initializeApp} = require("firebase-admin/app");
const {getAuth} = require("firebase-admin/auth");
const {getFirestore} = require("firebase-admin/firestore");
const {getStorage} = require("firebase-admin/storage");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK with credentials (only for real deployment)
const app = initializeApp();

const db =  getFirestore();
const storage = getStorage();
const auth = getAuth();

// add test places data to firestore if running locally
if (process.env.FIRESTORE_EMULATOR_HOST) {
  console.log("Using Firestore Emulator");
}

if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
  console.log("Using Auth Emulator");
}

if (process.env.FIREBASE_STORAGE_EMULATOR_HOST) {
  console.log("Using Storage Emulator, adding files");
}

module.exports = {db, storage, app, auth,admin};
