const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/Auth");
const placesRouter = require("./routes/Places");
const dataRouter = require("./routes/Data");

const app = express();
app.use(cors({
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers choke on 204
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
// app.use(express.static('public'))

app.get("/", (req, res) => {
  res.send("Hello from Firebase Functions with Express!");
});

app.use("/auth", authRouter);
app.use("/places", placesRouter);
app.use("/data",dataRouter);


exports.api = functions.https.onRequest(app);
