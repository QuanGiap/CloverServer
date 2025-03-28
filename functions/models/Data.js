const {db} = require("../FireBase/FireBase");

/**
 * Adds a new game history record to the database.
 * @param {Object} data - The game history data.
 * @param {string} data.userId - The user ID.
 * @param {string} data.codeName - The code name.
 * @param {Date} data.date - The date of the game.
 * @param {number} data.point - The points scored.
 * @param {number} data.task - The number of tasks completed.
 * @param {number} data.maxTask - The maximum number of tasks.
 * @param {string} data.time - The time taken.
 * @return {Promise<string>} The ID of the added document.
 * @throws Will throw an error if the document cannot be added.
 */
async function addDataHistory({
  userId = "",
  codeName,
  date,
  point,
  task,
  maxTask,
  time,
}) {
  try {
    const docRef = await db.collection("game_history").add({
      user_id: userId,
      code_name: codeName,
      date,
      point,
      task,
      max_task: maxTask,
      time,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}

/**
 * Updates an existing game history record in the database.
 * @param {Object} data - The update data.
 * @param {string} data.id - The document ID.
 * @param {string} data.userId - The user ID.
 * @return {Promise<string>} The ID of the updated document.
 * @throws Will throw an error if the document cannot be updated.
 */
async function updateDataHistory({id, userId}) {
  try {
    const docRef = db.collection("game_history").doc(id);
    await docRef.update({user_id: userId});
    return id;
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
}

module.exports = {
  addDataHistory,
  updateDataHistory,
};
