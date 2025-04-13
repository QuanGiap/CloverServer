const { getDownloadURL } = require("firebase-admin/storage");
const { storage, admin } = require("../FireBase/FireBase");

/**
 * Generate a public URL for a file in the storage bucket
 * @param {string} fileName - The name of the file in the storage bucket
 * @return {string} - The public URL of the file
 */
function getPublicUrl(fileName) {
  const bucket = storage.bucket();
  let bucketName = bucket.name;
  if (process.env.FIREBASE_STORAGE_EMULATOR_HOST) {
    bucketName = bucketName.replace('.firebasestorage.app', '.appspot.com'); // Fix bucket name only in emulator
  }
  const filePath = encodeURIComponent(fileName);
  // Check if running in emulator
  if (process.env.FIREBASE_STORAGE_EMULATOR_HOST) {
      return `http://${process.env.FIREBASE_STORAGE_EMULATOR_HOST}/${bucketName}/${filePath}`;
    }
    return `https://storage.googleapis.com/${bucketName}/${filePath}`;
}

module.exports = {getPublicUrl};
