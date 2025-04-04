const {initializeApp} = require("firebase-admin/app");
const {getAuth} = require("firebase-admin/auth");
const {getFirestore} = require("firebase-admin/firestore");
const {getStorage} = require("firebase-admin/storage");
const admin = require("firebase-admin");
const uploadFolder = require("../testData/Storage");

// Initialize Firebase Admin SDK with credentials (only for real deployment)
const app = initializeApp();

const db =  getFirestore();
const storage = getStorage();
const auth = getAuth();

// add test places data to firestore if running locally
if (process.env.FIRESTORE_EMULATOR_HOST) {
  console.log("Using Firestore Emulator, adding places data and stamps");
  const {addTestPlacesData} = require('../testData/FireStore');
  addTestPlacesData(db).then(() => console.log('Finished adding places data'), (err) => console.log(err));
}

if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
  console.log("Using Auth Emulator, adding user data");
  const {addTestUsers} = require('../testData/Auth');
  addTestUsers(auth).then(() => console.log('Users added'), (err) => console.log(err));
}

if (process.env.FIREBASE_STORAGE_EMULATOR_HOST) {
  console.log("Using Storage Emulator, adding files");
  const bucket = storage.bucket();
  uploadFolder('./testData/flag', 'flag', bucket).then(() => console.log('Uploaded flags'));
  uploadFolder('./testData/stampIcon', 'stamp', bucket).then(() => console.log('Uploaded stamps'));
}

module.exports = {db, storage, app, auth,admin};
