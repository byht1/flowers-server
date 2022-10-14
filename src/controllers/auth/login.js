const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { User } = require("../../models/user");
const { createError } = require("../../helpers");
const { SECRET_KEY } = process.env;

const logIn = async (req, res) => {
  const { email, password } = req.body;

  const isUser = await User.findOne({ email });

  if (!isUser) {
    throw createError(401, "user does not exist");
  }

  const comparePassword = await bcrypt.compare(password, isUser.password);

  if (!comparePassword) {
    throw createError(401, "Email or password is wrong");
  }

  const payload = {
    id: isUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  await User.findByIdAndUpdate(isUser._id, { token });

  res.json({ token, isActivate: isUser.isActivate, name: isUser.name });
};

module.exports = logIn;
