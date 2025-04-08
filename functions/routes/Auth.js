const express = require("express");
const { getGameDataHistoryByUserid } = require("../models/GameData");
const { getUserByEmail } = require("../models/User");
const { getPublicUrl } = require("../tool/GetPublicUrl");
const { getPlaces } = require("../models/Places");

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send("Email is required");
  }
  try {
    const userData = await getUserByEmail(email);
    if (!userData) {
      return res.status(404).send("User not found");
    }
    const gameHistory = await getGameDataHistoryByUserid(userData.id);
    const placesData = await getPlaces();
    const stamps = userData.stamps;
    const userSetStamps = new Set(stamps);
    const placeMap = {};
    placesData.forEach((place) => {
      placeMap[place.code_place_name] = place;
    });
    const gameHistoryWithPlaceData = gameHistory.map((game) => {
      const placeData = placeMap[game.code_name];
      return {
        ...game,
        place_name: placeData.place_name,
        flag_img_url: getPublicUrl('flag/'+placeData.flag_img_url),
        icon_url: getPublicUrl('stamp/'+placeData.icon_url),
      };
    });
    return res.status(200).json({
      user_id: userData.id,
      email: userData.email,
      game_history: gameHistoryWithPlaceData,
      stamps: placesData
        .map((place) => {
          return {
            code_name: place.code_place_name,
            place_name: place.place_name,
            icon_url: getPublicUrl('stamp/'+place.icon_url),
            has_stamp: userSetStamps.has(place.code_place_name),
          };
        })
        .sort(sortStamps),
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).send("Internal server error");
  }
});

/**
 * Sort function for stamps
 * @description Sorts stamps based on whether they have a stamp or not, and then by place name.
 * @param {*} a
 * @param {*} b
 * @returns {number} -1, 0, or 1
 */
function sortStamps(a, b) {
  if (a.has_stamp && b.has_stamp) {
    return a.place_name.localeCompare(b.place_name);
  }
  if (!a.has_stamp && !b.has_stamp) {
    return a.place_name.localeCompare(b.place_name);
  }
  return a.has_stamp ? -1 : 1;
}

module.exports = authRouter;
