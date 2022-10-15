const bcrypt = require("bcryptjs");
// const { v4: uuidv4 } = require("uuid");

const { User } = require("../../models/user");

const { createError } = require("../../helpers");

const signUp = async (req, res) => {
  const { email, password, name } = req.body;

  const isNewUser = await User.findOne({ email });
  console.log("🚀 ~ isNewUser", isNewUser);

  if (isNewUser) {
    throw createError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await User.create({
    email,
    password: hashPassword,
    name,
  });

  res.status(201).json({ result });
};

module.exports = signUp;
