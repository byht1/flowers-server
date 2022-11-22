const express = require("express");

const router = express.Router();

router.ger("/", async (req, res) => {
  try {
    res.json({
      status: 200,
      message: "start",
    });
  } catch (error) {
    return res.status(500).send("Server error");
  }
});

module.exports = router;
