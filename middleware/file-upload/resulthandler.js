const admin = require("firebase-admin");
const urlGenerator = require("./url");
const Data = require("../../models/firebaseDownload");
const { default: mongoose } = require("mongoose");

const saver = async (fileNameData, fileDownloadLinks) => {
  // const url = urlGenerator(fileData);

  // db connect
  try {
    await mongoose.connect(
      "mongodb+srv://Farid521:yosinjin521@cluster0.tw3aobv.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Terhubung ke basis data MongoDB");
  } catch (error) {
    console.error("Gagal terhubung ke basis data MongoDB:", error);
  }

  // data insert
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const minuete = now.getMinutes();
  const second = now.getSeconds();

  try {
    const generatedData = new Data({
      date: `${day}-${month}-${year}${hour}:${minuete}:${second}`,
      id: Math.floor(100000 + Math.random() * 1000000),
      generatedId: Math.floor(100000 + Math.random() * 1000000),
      fileName: fileNameData,
      downloadLinks: fileDownloadLinks,
    });

    console.log(generatedData);

    await generatedData.save();

    console.log("succes");
    return generatedData;
  } catch (err) {
    console.log("error dalam save data ke database : " + err);
  } finally {
    mongoose.disconnect();
    console.log('disconected')
  }
};

module.exports = saver;
