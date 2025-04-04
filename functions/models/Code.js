const {db} = require("../FireBase/FireBase");

/**
 * Fetches the ID of the game_history collection by comparing the code parameter
 * with entries in the code collection from Firebase.
 * @param {number} code - The code to compare.
 * @return {Promise<{codeId: string, gameHistoryId: string}>} - The ID of
 *          the matching game_history document, or null if not found.
 */
async function getGameHistoryIdByCode(code) {
  const codeCollection = db.collection("code");
  try {
    const snapshot = await codeCollection.doc(code).get();
    if (snapshot.exists) {
      console.log("No matching documents found.");
      return null;
    }
    const doc = snapshot.data();
    return {
      codeId: code,
      gameHistoryId: doc.game_history_id,
    };
  } catch (error) {
    console.error("Error fetching game history ID:", error);
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
async function createCodeAndGameHistory(code, gameHistoryId) {
  const codeCollection = db.collection("code");
  try {
    // Check for duplicate code
    const snapshot = await codeCollection.doc(code).get();
    if (snapshot.exists) {
      console.log("Duplicate code exists.");
      return null;
    }

    // Add new document
    await codeCollection.doc(code).set({
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
    await codeCollection.doc(code).delete();
    console.log(`Code deleted successfully.`);
    return true;
  } catch (error) {
    console.error(`Error deleting code with ID ${code}:`, error);
    return false;
  }
}

// Export the function for use in other parts of the application
module.exports = {
  getGameHistoryIdByCode,
  createCodeAndGameHistory,
  deleteCode,
};
