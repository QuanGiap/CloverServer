const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Firebase Functions with Express!");
});

app.post("/data", (req, res) => {
  res.json({ message: "Received data", data: req.body });
});

exports.api = functions.https.onRequest(app);
