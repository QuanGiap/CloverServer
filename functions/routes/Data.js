const express = require("express");
const { addGameDataHistory, getGameHistoryByCode, updateGameDataHistory } = require("../models/GameData");
const ErrRes = require("../tool/ErrRes");
const { checkCodeDublicate, createCode, deleteCode } = require("../models/Code");
const { getUserByEmail, createUser, addStampToUser } = require("../models/User");
const { checkPlaceExists } = require("../models/Places");
const dataRouter = express.Router();
// userId = "",
// codePlaceName,
// points,
// time,
dataRouter.post("/", async (req, res) => {
  const { code, user_id = "", points, time, code_place_name } = req.body;
  const errors = [];
  let typeError = "";
  if (!code) {
    errors.push("code is required");
  }
  if (code_place_name === "" || !code_place_name) {
    errors.push("code_place_name is required");
  }
  if (points === undefined) {
    errors.push("points is required");
  }
  if (time === undefined) {
    errors.push("time is required");
  }
  if (errors.length > 0) {
    return ErrRes({res,error:errors[0],errors,statusCode:400,typeError:"VALIDATION"});
  }
  const isDubCodePromise = checkCodeDublicate(code);
  const isPlacesExistPromise = checkPlaceExists(code_place_name);
  const [isDub, isPlacesExist] = await Promise.all([isDubCodePromise, isPlacesExistPromise]);
  if (isDub) {
    errors.push(`This code ${code} already exists`);
    typeError = "CODE_DUPLICATE";
  }
  if(!isPlacesExist){
    errors.push(`This place ${code_place_name} does not exist`);
    typeError = "PLACE_NOT_FOUND";
  }
  if (errors.length > 0) {
    return ErrRes({res,error:errors[0],errors,statusCode:400,typeError});
  }
  const gameDataId = await addGameDataHistory({
    userId: user_id,
    codePlaceName: code_place_name,
    points,
    time: time,
  });

  await createCode(code,gameDataId);
  return res.status(200).json({
    message: "Game data added successfully",
    gameDataId,
  });
});

dataRouter.post("/save",async (req,res)=>{
  const {email,code} = req.body;
  const gameHistory = await getGameHistoryByCode(code);
  if(!gameHistory){
    return ErrRes({res,error:"Game history not found",statusCode:404,typeError:"GAME_HISTORY_NOT_FOUND"});
  }
  let user = await getUserByEmail(email);
  if(!user){
    user = await createUser(email);
  }
  const promiseAddStamp = addStampToUser(user.id,gameHistory.code_place_name);
  const promiseUpdateGameData = updateGameDataHistory({id:gameHistory.id,userId:user.id});
  const promiseDeleteCode = deleteCode(code);
  await Promise.all([promiseAddStamp,promiseUpdateGameData,promiseDeleteCode]);
  return res.status(200).json({
    message: "Game data saved successfully",
    gameDataId: gameHistory.id,
  });
})
module.exports = dataRouter;
