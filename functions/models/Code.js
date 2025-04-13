const {db} = require("../FireBase/FireBase");

/**
 * Checks if a code already exists in the database.
 * @param {number} code - The code to check.
 * @return {Promise<boolean>} - Returns true if the code exists, false otherwise.
 */
async function checkCodeDublicate(code) {
  const codeCollection = db.collection("code");
  try {
    const snapshot = await codeCollection.doc(`${code}`).get();
    if (snapshot.exists) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error checking duplicate code:", error);
    throw error;
  }
}

/**
 * Creates a new code_id and game_history_id. If a duplicate code exists,
 * returns null.
 * @param {number} code - The code to create.
 * @param {string} gameHistoryId - The game_history_id.
 * @return {Promise<{codeId: string, gameHistoryId: string}|null>} - The created
 * IDs or null if duplicate exists.
 */
async function createCode(code, gameHistoryId) {
  const codeCollection = db.collection("code");
  try {
    // Add new document
    await codeCollection.doc(`${code}`).set({
      code,
      game_history_id: gameHistoryId,
    });

    return {code: code, gameHistoryId};
  } catch (error) {
    console.error("Error creating code and game history:", error);
    throw error;
  }
}

/**
 * Deletes a code document by its ID.
 * @param {string} code - The ID of the code document to delete.
 * @return {Promise<boolean>} - Returns true if the deletion was successful,
 * false otherwise.
 */
async function deleteCode(code) {
  const codeCollection = db.collection("code");
  try {
    await codeCollection.doc(`${code}`).delete();
    return true;
  } catch (error) {
    console.error(`Error deleting code with ID ${code}:`, error);
    return false;
  }
}

// Export the function for use in other parts of the application
module.exports = {
  createCode,
  deleteCode,
  checkCodeDublicate
};
