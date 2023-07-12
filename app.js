// Import modul-modul yang diperlukan
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const postReceiver = require("./middleware/clipboard/postData");
const resultsData = require("./middleware/clipboard/results");
const remover = require("./middleware/clipboard/delete");
const urlGenerator = require("./middleware/file-upload/url");
const resultHandler = require("./middleware/file-upload/resulthandler");
const imageSearchHandler = require("./middleware/file-upload/imageSearch");
const admin = require("firebase-admin");

// Inisialisasi aplikasi Express
const app = express();
const port = 3000;

// Middleware untuk memproses data JSON
app.use(bodyParser.json());

// Konfigurasi storage untuk multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// firebase init
const serviceAccount = require("./middleware/file-upload/copy-co-firebase-adminsdk-9qf0x-94a326fbda.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const bucket = admin.storage().bucket("gs://copy-co.appspot.com/");

// Konfigurasi header untuk mengizinkan CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Handler untuk permintaan GET pada root path ("/")
app.get("/", (req, res) => {
  res.send("backend");
});

// Handler untuk permintaan GET pada path "/testing"
// Mengirimkan file index.html
app.get("/testing", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Handler untuk permintaan POST pada path "/post"
// Menggunakan middleware postReceiver
app.post("/post", postReceiver);

// ****************************************************************

// ======================================================================================================== //
// ======================================================================================================== //
// ======================================================================================================== //

// Handler untuk permintaan POST pada path "/upload"
// Menyimpan file yang diunggah ke Firebase Storage
app.post("/upload", upload.single("file"), async (req, res, next) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const fileName = Date.now() + file.originalname;
  const destinationPath = `user-file/${fileName}`;
  const fileUpload = bucket.file(fileName);

  const fileLink = bucket.file(fileName);

  const blobStream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype,
      destination: destinationPath,
    },
  });

  blobStream.on("error", (error) => {
    console.log(error);
    return res.status(500).json({ error: "Failed to upload file" });
  });

  blobStream.on("finish", async () => {
    //  const url = await resultHandler(fileName)
    const url = await fileLink.getSignedUrl({
      action: "read",
      expires: Date.now() + 1000 * 60 * 30,
    });

    await resultHandler(fileName, url);

    console.log(`url adalah : ${url}`);
    const userUrl = url[0];

    setTimeout(() => {
      console.log('hello world hhhhhhhhhhhhhh')
    }, 3000)

    setTimeout(async () => {
      console.log("Timer telah selesai");

      try {
        await fileUpload.delete();
        console.log(`File ${fileName} berhasil dihapus.`);
      } catch (error) {
        console.error(
          `Terjadi kesalahan saat menghapus file ${fileName}:`,
          error
        );
      }
    }, 3 * 60 * 1000);

    return await res.status(200).json({ url: userUrl });
  });
  blobStream.end(file.buffer);
});

// ======================================================================================================== //
// ======================================================================================================== //
// ======================================================================================================== //

// ****************************************************************

// ===================

app.post("/imageSearch", imageSearchHandler);

// ===================

// Handler untuk permintaan POST pada path "/results"
// Menggunakan middleware resultsData
app.post("/results", resultsData);

app.post('/dbtrigger', (req,res) => {
  console.log(req.body)
  res.status(20).send('succes')
})

// Handler untuk permintaan POST pada path "/delete"
// Menggunakan middleware remover
app.post("/delete", remover);

// url tester
app.post("/url", urlGenerator);

// Menjalankan server pada port yang ditentukan
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
