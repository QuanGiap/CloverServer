const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/Auth");
const placesRouter = require("./routes/Places");
const dataRouter = require("./routes/Data");
const { storage } = require("./FireBase/FireBase");
const { getPublicUrl } = require("./tool/GetPublicUrl");

const app = express();
app.use(cors({
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers choke on 204
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
// app.use(express.static('public'))
app.use(express.raw({ type: "multipart/form-data", limit: "10mb" }));
app.get("/", (req, res) => {
  res.send("Hello from Firebase Functions with Express!");
});
app.get("/test", (req, res) => {
  const file = storage.bucket().file('flag/china.png');
  res.json({url:getPublicUrl('test.jpg')})
});
app.use("/auth", authRouter);
app.use("/places", placesRouter);
app.use("/data",dataRouter);


exports.api = functions.https.onRequest(app);
