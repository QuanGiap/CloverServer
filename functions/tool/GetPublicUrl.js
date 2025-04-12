const { storage, admin } = require("../FireBase/FireBase");

/**
 * Generate a public URL for a file in the storage bucket
 * @param {string} fileName - The name of the file in the storage bucket
 * @return {string} - The public URL of the file
 */
function getPublicUrl(fileName) {
  const bucket = storage.bucket();
  const bucketName = bucket.name;
  const filePath = encodeURIComponent(fileName);
  const file = bucket.file(fileName);
  // Check if running in emulator
  if (process.env.FIREBASE_STORAGE_EMULATOR_HOST) {
      return `http://${process.env.FIREBASE_STORAGE_EMULATOR_HOST}/${bucketName}/${fileName}`;
    }
    return file.publicUrl();
}

module.exports = {getPublicUrl};
