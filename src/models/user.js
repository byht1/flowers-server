const { Schema, model } = require("mongoose");
// const Joi = require("Joi");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
    isActivate: {
      type: Boolean,
      default: false,
    },
    // activateLink: {
    //   type: String,
    //   required: true,
    // },
  },
  { versionKey: false, timestamps: true }
);

// const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

// const userJoi = Joi.object({
//   password: Joi.string().required(),
//   email: Joi.string().pattern(emailRegexp).required(),
// });

const User = model("user", userSchema);

module.exports = {
  // userJoi,
  User,
};
