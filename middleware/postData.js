const mongoose = require("mongoose");
const Data = require("./mongooseModell");

const processMiddleware = async function (req, res, next) {
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
  const { message } = req.body;
  //
  try {
    const generatedData = new Data({
      date: `${day}-${month}-${year}${hour}:${minuete}:${second}`,
      id: Math.floor(1000 + Math.random() * 9009),
      generatedId: Math.floor(100000 + Math.random() * 1000000),
      message: message || "hello world",
    });

    await generatedData.save();

    console.log(generatedData);
    
    res.json({
      generatedId: generatedData.generatedId,
    });
    next();
    // error handling
  } catch (error) {
    console.error("Gagal menyimpan data:", error);
    next(error);
  }
};

module.exports = processMiddleware;
