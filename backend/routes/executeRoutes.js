const express = require("express");
const axios = require("axios");

const router = express.Router();

const JUDGE0_URL = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";

router.post("/", async (req, res) => {
  const { code, language } = req.body;

  const languageMap = {
    javascript: 63,
    python: 71,
    java: 62,
    cpp: 54,
  };

  try {
    const response = await axios.post(
      JUDGE0_URL,
      {
        source_code: code,
        language_id: languageMap[language],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Execution failed" });
  }
});

module.exports = router;