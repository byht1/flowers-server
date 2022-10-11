const express = require("express");
const { basedir } = global;

const {
  signUp,
  logIn,
  logOut,
  validate,
} = require(`${basedir}/controllers/auth`);
const { auth } = require(`${basedir}/middleware`);

const { ctrlWrapper } = require(`${basedir}/helpers`);

const router = express.Router();

router.post("/signup", ctrlWrapper(signUp));
router.post("/", ctrlWrapper(logIn));
router.get("/", auth, ctrlWrapper(logOut));
router.get("/validate", auth, validate);

module.exports = router;
