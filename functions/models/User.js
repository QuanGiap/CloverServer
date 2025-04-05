const { auth, db, admin } = require("../FireBase/FireBase");
// async function getPlayHistory(req, user_id) {}

/**
 * Return user data, return null if not exist
 * @param {string} email
 * @return {object|null} userData
 */
async function getUserByEmail(email) {
  try {
    const user = await auth.getUserByEmail(email);
    const userData = await db.collection("user").doc(user.uid).get();
    return {id:user.uid, ...userData.data()}
  } catch (err) {
    if(err.code === 'auth/user-not-found'){
      return null;
    }
    else {
      console.error("Error fetching user:", err);
      throw new Error("Internal server error");
    }
  }
}


/**
 * add stamp to user
 * @param {string} userId
 * @param {string} stamp
 * @return {Promise} userData
 */
async function addStampToUser(userId, stamp) {
  const res = await db
    .collection("user")
    .doc(userId)
    .update({
      stamps: admin.firestore.FieldValue.arrayUnion(stamp),
    });
    return res;
}

/**
 * Create new user
 * @param {string} userEmail
 * @return {Promise} userData
 */
async function createUser(userEmail) {
  const user = await auth.createUser({
    email: userEmail,
  });
  await db.collection("user").doc(user.uid).set({
    stamps: [],
    email: userEmail,
  });
  return {
    id:user.uid,
    stamps:[],
    email: userEmail,
  };
}

module.exports = { getUserByEmail, createUser,addStampToUser };
