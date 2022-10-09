const { Schema, model } = require("mongoose");

const flowerSchema = new Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  image: { type: String },
  status: { type: String },
  section: { type: String },
  rating: { type: Number },
  category: { type: String },
  sort: { type: String },
  color: { type: String },
  amount: { type: Number },
  size: { type: Number },
  from: { type: String },
  contain: [
    {
      flower: { type: String },
      count: { type: String },
    },
  ],

  adds: [
    {
      Додатки: { type: String },
    },
  ],

  package: [
    {
      Упакування: { type: String },
    },
  ],
});

const Flower = model("flower", flowerSchema);

module.exports = Flower;
