const mongoose = require("mongoose");
const Data = require("../../models/copyModels");

const responseJson = {
  status: "succes",
};

const deleteData = async (req, res, next) => {
  try {
    await mongoose.connect(
      "mongodb+srv://Farid521:yosinjin521@cluster0.tw3aobv.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Terhubung ke basis data MongoDB");

    const { userId } = req.body;
    await Data.deleteOne({ id: userId });
    console.log("Data berhasil dihapus");
    res.status(200).json(responseJson);
  } catch (error) {
    console.error("Gagal menghapus data", error);
    res.status(500).send("Gagal menghapus data");
  } finally {
    // Tutup koneksi setelah operasi selesai
    mongoose.disconnect();
  }
};

module.exports = deleteData;
