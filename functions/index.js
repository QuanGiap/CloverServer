const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { db, auth, storage } = require("./FireBase/FireBase");

const app = express();
app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  allowedHeaders:['Content-Type', 'Authorization']
}));

app.use(express.json());
// app.use(express.static('public'))

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

app.get("/auth/sign_up/:user_email",async(req,res)=>{
  const {user_email} = req.params;
  const user = await auth.createUser({
    email:user_email,
    emailVerified:false,
  })
  return res.json({message:"User created",user});
})
app.get("/auth/verify/:user_email",async(req,res)=>{
  const {user_email} = req.params;
  const link = await auth.generateEmailVerificationLink(user_email);
  return res.json({message:"Link created",link});
})
app.get("/auth/sign_in/:user_email",async(req,res)=>{
  const {user_email} = req.params;
  const user = await auth.getUserByEmail(user_email)
  return res.json({message:"User fetched",user});
})
app.get("/storage/:file_name",async(req,res)=>{
  const {file_name} = req.params;
  const file = storage.bucket().file(file_name);
  return res.json({ message: "File URL fetched", url:file.publicUrl() });
})
app.post("/storage/:file_name",fileUpload(),checkValidImgMiddleware,async(req,res)=>{
  const { images } = req.files;
  const file = storage.bucket().file(req.params.file_name);

  const stream = file.createWriteStream({
    metadata: {
      contentType: images.mimetype,
    },
  });

  stream.on('error', (err) => {
    return res.status(500).json({ error: err.message });
  });

  stream.on('finish', async () => {
    await file.makePublic();
    return res.json({ message: "File uploaded and made public", url: file.publicUrl() });
  });

  stream.end(images.data);
})

exports.api = functions.https.onRequest(app);