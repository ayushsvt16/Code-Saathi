const express = require("express");
const axios = require("axios");

const router = express.Router();

const JUDGE0_URL ="https://judge029.p.rapidapi.com/submissions/1df59684-e5e7-4ce1-9975-ff732823e37e?base64_encoded=true&fields=*";

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
          "X-RapidAPI-Host": "judge029.p.rapidapi.com",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.log("🔥 Judge0 Error:");
    console.log(error.response?.data || error.message);

    res.status(500).json({
      error: error.response?.data || error.message
    });
  }
});

module.exports = router;