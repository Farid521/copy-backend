const mongoose = require("mongoose");

const downloadFileSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  generatedId: {
    type: Number,
    required: true,
    unique: true,
  },
  fileName: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  downloadLinks: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  ttl: {
    type: Date,
    expires: "3m", // Tambahkan opsi expires dengan nilai '3m' untuk 3 menit
  },
});

const downloadModel = mongoose.model("downloadModel", downloadFileSchema);
module.exports = downloadModel;
