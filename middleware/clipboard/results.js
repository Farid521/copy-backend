const mongoose = require("mongoose");
const Data = require("./mongooseModell");

const resultsData = async function (req, res, next) {
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
  const { requestedData } = req.body;

  try {
    const result = await Data.find({ generatedId: requestedData });
    console.log(result);
    res.json(result);

    next();
  } catch (err) {
    res
      .json({
        status: "not found",
      })
      .status(404);
    next(err);
  }
};

module.exports = resultsData;
