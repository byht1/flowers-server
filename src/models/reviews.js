const Joi = require("joi");
const { Schema, model } = require("mongoose");

const reviewsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    text: {
      type: String,
      minlength: 10,
      maxlength: 500,
      required: [true, "Text is required"],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      required: [true, "Rating is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    photo: {
      type: [String],
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const reviewsJoi = Joi.object({
  name: Joi.string().required(),
  text: Joi.string().min(10).max(500).required(),
  rating: Joi.string().min(0).max(5).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  photo: Joi.array().items(Joi.string()),
});

const Reviews = model("review", reviewsSchema);

module.exports = {
  reviewsJoi,
  Reviews,
};
