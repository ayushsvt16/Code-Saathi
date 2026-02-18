const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: String,
    default: "// Start coding..."
  },
  language: {
    type: String,
    default: "javascript"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Room", roomSchema);
