const { storage, admin } = require("../FireBase/FireBase");


function getPublicUrl(filePath) {
    const bucket = storage.bucket();
    const bucketName = bucket.name; 
    const encodedPath = encodeURIComponent(filePath);
  
    if (process.env.FIREBASE_STORAGE_EMULATOR_HOST) {
      // Running in emulator
      const host = process.env.FIREBASE_STORAGE_EMULATOR_HOST; 
      return `http://${host}/v0/b/${bucketName}/o/${encodedPath}?alt=media`;
    } else {
      // Production
      return `https://storage.googleapis.com/${bucketName}/${filePath}`;
    }
  }
module.exports = {getPublicUrl};
