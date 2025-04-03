const {initializeApp} = require("firebase-admin/app");
const {getAuth} = require("firebase-admin/auth");
const {getFirestore} = require("firebase-admin/firestore");
const {getStorage} = require("firebase-admin/storage");
const uploadFolder = require("../testData/Storage");

// Initialize Firebase Admin SDK with credentials (only for real deployment)
const app = initializeApp();

const db = getFirestore();
const storage = getStorage();
const auth = getAuth();

// add test places data to firestore if running locally
if (process.env.FIRESTORE_EMULATOR_HOST) {
  console.log("Using Firestore Emulator, adding places data");
  const {places} = require('../testData/FireStore');
  const batch = db.batch();
  places.forEach(place=>{
    const docRef = db.collection('places').doc(place.codeName);
    batch.set(docRef,place);
  })
  batch.commit().then(()=>console.log('Finished adding places data'),(err)=>console.log(err));
}
if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
  console.log("Using Auth Emulator, adding user data");
  const {users} = require('../testData/Auth');
  async function checkIfNoUsers() {
    const listUsersResult = await auth.listUsers(1); // Retrieve 1 user
    if (listUsersResult.users.length === 0) {
        const promises = users.map((user)=>auth.createUser({
          email: user.email,
        }))
        await Promise.all(promises);
        console.log('user added');
    } 
  }
  checkIfNoUsers();
}
if (process.env.FIREBASE_STORAGE_EMULATOR_HOST) {
  console.log("Using Storage Emulator, adding files");
  const bucket = storage.bucket();
  uploadFolder('./testData/flag','flag',bucket).then(()=>console.log('Uploaded flags'));
  uploadFolder('./testData/stampIcon','stamp',bucket).then(()=>console.log('Uploaded stamps'));
}

module.exports = {db, storage, app, auth};
