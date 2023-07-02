var QRCode = require("qrcode");

const qrGenerator = (req, res, next) => {
  const { textData } = req.body;
  res.send("succes");
  next();
};

module.exports = qrGenerator;