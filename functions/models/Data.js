import { db } from "../FireBase/FireBase"
// example data
// {
//     user_id:'2901840912',
//     code_name: "Space Needle",
//     date: new Date("1995-12-17T03:24:00"),
//     point: 728,
//     task: 10,
//     max_task: 10,
//     time: "07:48",
//   },

async function addDataHistory({ user_id="", code_name, date, point, task, max_task, time }) {
  try {
    const docRef = await db.collection("game_history").add({
      user_id,
      code_name,
      date,
      point,
      task,
      max_task,
      time,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}

async function updateDataHistory({ id, user_id }) {
  try {
    const docRef = db.collection("game_history").doc(id);
    await docRef.update({ user_id });
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