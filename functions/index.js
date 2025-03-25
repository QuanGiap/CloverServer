const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { db } = require("./FireBase/FireBase");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Firebase Functions with Express!");
});

app.get("/data", async (req, res) => {
  const snapshot = await db.collection("data").get();
  return res.json({ message: "Data from Firestore", data: snapshot.docs.map((doc) => doc.data()) });
});

app.get("/post_data_test",async (req,res)=>{
  const number = Math.floor(Math.random() * 100);
  const data = {
    name: `test ${number}`,
    age: 20,
    email: `test${number}@test.com`,
  };
  await db.collection("data").add(data);
  return res.json({ message: "Data added to Firestore", data });
})

app.post("/data", (req, res) => {
  res.json({ message: "Received data", data: req.body });
});

exports.api = functions.https.onRequest(app);