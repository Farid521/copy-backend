const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
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
  message: {
    type: String,
    required: true,
  },
});

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
