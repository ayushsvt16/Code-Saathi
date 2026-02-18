const express = require("express");
const Room = require("../models/room");

const router = express.Router();

// Create Room
router.post("/create", async (req, res) => {
  try {
    const roomId = Math.random().toString(36).substring(2, 8);

    const newRoom = new Room({ roomId });
    await newRoom.save();

    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Room by ID
router.get("/:roomId", async (req, res) => {
  try {
    const room = await Room.findOne({ roomId: req.params.roomId });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Code
router.put("/:roomId", async (req, res) => {
  try {
    const { code, language } = req.body;

    const updatedRoom = await Room.findOneAndUpdate(
      { roomId: req.params.roomId },
      { code, language },
      { new: true }
    );

    res.json(updatedRoom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
