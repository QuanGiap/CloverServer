const {db, admin} = require("../FireBase/FireBase");


/**
 * Fetches the ID of the game_history collection by comparing the code parameter
 * with entries in the code collection from Firebase.
 * @param {number} code - The code to compare.
 * @return {Promise<{codeId: string, gameHistoryId: string}>} - The ID of
 *          the matching game_history document, or null if not found.
 */
async function getGameHistoryByCode(code) {
  const codeCollection = db.collection("code");
  try {
    const snapshot = await codeCollection.doc(code).get();
    if (snapshot.exists) {
      console.log("No matching documents found.");
      return null;
    }
    const doc = snapshot.data();
    return await getGameDataHistoryById(doc.game_history_id);
  } catch (error) {
    console.error("Error fetching game history ID:", error);
    throw error;
  }
}
/**
 * Adds a new game history record to the database.
 * @param {Object} data - The game history data.
 * @param {string} data.userId - The user ID.
 * @param {string} data.codePlaceName - The code name.
 * @param {number} data.points - The points scored.
 * @param {string} data.time - The time taken.
 * @return {Promise<string>} The ID of the added document.
 * @throws Will throw an error if the document cannot be added.
 */
async function addGameDataHistory({
  userId = "",
  codePlaceName,
  points,
  time,
}) {
    const docRef = await db.collection("game_history").add({
      user_id: userId,
      code_place_name: codePlaceName,
      date:admin.firestore.Timestamp.now(),
      points,
      time,
    });
    return docRef.id;
}

/**
 * Updates an existing game history record in the database.
 * @param {Object} data - The update data.
 * @param {string} data.id - The document ID.
 * @param {string} data.userId - The user ID.
 * @return {Promise<string>} The ID of the updated document.
 * @throws Will throw an error if the document cannot be updated.
 */
async function updateGameDataHistory({id, userId}) {
  try {
    const docRef = db.collection("game_history").doc(id);
    await docRef.update({user_id: userId});
    return id;
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
}


async function getGameDataHistoryByUserid(userId){
  try {
    const gameHistoryCollection = db.collection("game_history");
    const snapshot = await gameHistoryCollection.where("user_id", "==", userId).get();
    if (snapshot.empty) {
      console.log("No matching documents found.");
      return [];
    }
    const gameHistory = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return gameHistory;
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
}

async function getGameDataHistoryById(id){
  const gameHistoryDoc = await db.collection("game_history").doc(id).get();
  if(!gameHistoryDoc.exists) {
    console.log("No matching documents found.");
    return null;
  }
  const {code_place_name,date,points,time} = gameHistoryDoc.data();
  return {
    id: gameHistoryDoc.id,
    codePlaceName: code_place_name,
    date:date,
    points,
    time,
  };
}

module.exports = {
  addGameDataHistory,
  updateGameDataHistory,
  getGameDataHistoryByUserid,
  getGameDataHistoryById,
  getGameHistoryByCode
};
