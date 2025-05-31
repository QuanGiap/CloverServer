const express = require("express");
const { getPlaces, uploadPlaces } = require("../models/Places");
const placesRouter = express.Router();
const handleFileUpload = require("../tool/HandleFileUpload");
placesRouter.get("/", async (req, res) => {
  const places = await getPlaces();
  return res.status(200).json({
    message: "Places fetched successfully",
    places,
  });
});

// placesRouter.post("/", async (req, res) => {
//   const {json,flag,stamp} = await handleFileUpload(req);
//   const place = await uploadPlaces({stamp,flag,body:json});
//   return res.status(200).json({
//     message: "Places uploaded successfully",
//     place,
//   })
// });

module.exports = placesRouter;
