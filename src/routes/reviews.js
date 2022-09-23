const express = require("express");
const { basedir } = global;

const { getAll, newReview } = require(`${basedir}/controllers/review`);
const { upload } = require(`${basedir}/middleware`);

const { ctrlWrapper } = require(`${basedir}/helpers`);

const router = express.Router();

router.get("/", ctrlWrapper(getAll));
router.post("/", upload.array("file", 4), ctrlWrapper(newReview));

module.exports = router;
