const express = require("express");
const { getPlaces } = require("../models/Places");
const placesRouter = express.Router();
const fileUpload = require("express-fileupload");

placesRouter.get("/", async (req, res) => {
    const places = await getPlaces();
    return res.status(200).json({
        message: "Places fetched successfully",
        places,
    });
})

// Only apply `express-fileupload` to the /upload route
placesRouter.post("/", fileUpload(), async (req, res) => {
    try {
      if (!req.files || !req.files.file) {
        return res.status(400).send("No file uploaded.");
      }
  
      const uploadedFile = req.files.file;
     
      res.status(200).json({
        message: "File uploaded successfully",
        fileName: uploadedFile.name,
        fileSize: uploadedFile.size,
        mimeType: uploadedFile.mimetype,
      });
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).send("Upload failed.");
    }
  });
  
module.exports = placesRouter;
