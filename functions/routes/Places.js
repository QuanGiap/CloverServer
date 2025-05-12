const express = require("express");
const { getPlaces } = require("../models/Places");
const placesRouter = express.Router();
const fileParser = require("express-multipart-file-parser");
const Busboy = require("busboy");
const os = require("os");
const path = require("path");
const fs = require("fs");
placesRouter.get("/", async (req, res) => {
  const places = await getPlaces();
  return res.status(200).json({
    message: "Places fetched successfully",
    places,
  });
});

placesRouter.post("/", async (req, res) => {
  try {
    const busboy = Busboy({ headers: req.headers });

    const uploadedFiles = [];

    busboy.on("file", (fieldname, file, {filename, mimeType}) => {
      console.log(mimeType)
      if (!filename || typeof filename !== "string") {
        return file.resume(); // Skip invalid file
      }
      // const filepath = path.join(os.tmpdir(), filename); // ✅ safe usage
      // const writeStream = fs.createWriteStream(filepath);

      let fileSize = 0;
      file.on("data", (data) => {
        fileSize += data.length;
      });

      file.on("end", () => {
        uploadedFiles.push({
          field: fieldname,
          filename,
          size: fileSize,
        });
      });

      // file.pipe(writeStream);
    });

    busboy.on("finish", () => {
      res.status(200).json({
        message: "Files uploaded successfully!",
        files: uploadedFiles,
      });
    });

    // Firebase provides the entire body as raw buffer
    busboy.end(req.rawBody);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).send("Upload failed.");
  }
});

module.exports = placesRouter;
