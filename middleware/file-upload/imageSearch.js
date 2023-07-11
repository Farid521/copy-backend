const mongoose = require("mongoose");
const imageBucket = require("../../models/firebaseDownload");

const imageSearch = async (req, res, next) => {
  const { imageRequest } = req.body;

  // db conn
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

  //   image search

  try {
    const result = await imageBucket.find({ generatedId: imageRequest });
    console.log(result);
    res.json(result)
  } catch (err) {
    console.log(err);
    res.json({status: "error"}).status(500)
  }
  mongoose.disconnect()
  next()
};

module.exports = imageSearch