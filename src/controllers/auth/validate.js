const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");
const { SECRET_KEY } = process.env;

const validate = async (req, res) => {
  const { id } = req.user;

  const payload = {
    id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  const result = await User.findByIdAndUpdate(id, { token });

  res.status(201).json({
    token: result.token,
    email: result.email,
  });
};

module.exports = validate;
