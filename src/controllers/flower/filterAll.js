const Flower = require("../../models/modelFlower");

const filterAll = async (req, res) => {
  const {
    id,
    priseMin = 0,
    priseMax = 9999999,
    sorting = "rating,-1",
    page = 1,
    limit = 40,
    ...params
  } = req.query;

  const skip = (page - 1) * limit;
  const sort = sorting.split(",");
  const _id = id ? { _id: id.split(",") } : { "": "" };

  const result = await Flower.find({
    ..._id,
    ...params,
    price: { $gte: priseMin, $lte: priseMax },
  })
    .sort({ [sort[0]]: sort[1] })
    .limit(limit)
    .skip(skip);

  // const data = await Flower.find(_id);

  const totalObj = await Flower.countDocuments();
  const total = result.length;

  res.json({
    result,
    total,
    totalPage: Math.ceil(totalObj / limit),
    currentPage: page,
  });
};

module.exports = filterAll;
