const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const {db, auth, storage} = require("./FireBase/FireBase");

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

app.get("/data", async (req, res) => {
  const snapshot = await db.collection("data").get();
  return res.json({
    message: "Data from Firestore",
    data: snapshot.docs.map((doc) => doc.data()),
  });
});

app.get("/post_data_test", async (req, res) => {
  const number = Math.floor(Math.random() * 100);
  const data = {
    name: `test ${number}`,
    age: 20,
    email: `test${number}@test.com`,
  };
  await db.collection("data").add(data);
  return res.json({message: "Data added to Firestore", data});
});

app.get("/auth/sign_up/:userEmail", async (req, res) => {
  const {userEmail} = req.params;
  const user = await auth.createUser({
    email: userEmail,
    // emailVerified:false,
  });
  return res.json({message: "User created", user});
});

app.get("/storage/:fileName", async (req, res) => {
  const {fileName} = req.params;
  const file = storage.bucket().file(fileName);
  return res.json({message: "File URL fetched", url: file.publicUrl()});
});

exports.api = functions.https.onRequest(app);
