const express = require("express");
const { getPlaces } = require("../models/Places");
const placesRouter = express.Router();
const fileParser = require("express-multipart-file-parser");
const Busboy = require("busboy");
const os = require("os");
const path = require("path");
const fs = require("fs");
const handleFileUpload = require("../tool/HandleFileUpload");
placesRouter.get("/", async (req, res) => {
  const places = await getPlaces();
  return res.status(200).json({
    message: "Places fetched successfully",
    places,
  });
});

placesRouter.post("/", async (req, res) => {
  const {json,flag,stamp} = await handleFileUpload(req);

});

module.exports = placesRouter;
