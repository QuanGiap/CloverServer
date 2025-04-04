const { auth, db } = require("../FireBase/FireBase");
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
    return userData.data();
  } catch (err) {
    if(err.code === 'auth/user-not-found'){
      return null;
    }
    console.error('Error fetching user:', err);
  }
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
  const userData = await db.collection("user").doc(user.uid).set({
    stamps: [],
    email: userEmail,
  });
  return userData;
}

module.exports = { getUserByEmail, createUser };
