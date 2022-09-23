const { Reviews } = require("../../models/reviews");

const getAll = async (req, res) => {
  const data = await Reviews.find({}, "-updatedAt");

  res.json({
    data,
    total: data.length,
  });
};

module.exports = getAll;
