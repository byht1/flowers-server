const Flower = require("../../models/modelFlower");

// Приклад використання .../flowers?page=1&limits=20

const getAll = async (req, res) => {
  // const { page = 1, limit = 20 } = req.query;
  // const skip = (page - 1) * limit;

  const result = await Flower.find({});

  const total = await Flower.countDocuments();

  res.json({ result, total });
};

module.exports = getAll;
