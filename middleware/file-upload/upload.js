const mongoose = require("mongoose");
const dataModel = require("../../models/firebaseDownload");

// mendokumenttasikan file ke database mongodb

const fileUpload = async (fileNameParams, fileLink) => {
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
    const generatedData = new dataModel({
      date: `${day}-${month}-${year}${hour}:${minuete}:${second}`,
      id: Math.floor(1000 + Math.random() * 9009),
      generatedId: Math.floor(100000 + Math.random() * 1000000),
      fileName: fileNameParams,
      downloadLinks: fileLink,
    });

    await generatedData.save();

    console.log("saving download documentation succes");
  } catch (error) {
    console.log("error while saving data");
  } finally {
    mongoose.disconnect();
  }
};

module.exports = fileUpload;
