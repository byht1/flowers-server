const Flower = require("../../models/modelFlower");

const { createError } = require("../../helpers");

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await Flower.findById({ _id: id });

  if (!result) {
    throw createError(401, "This id does not exist");
  }

  res.json(result);
};

module.exports = getById;
