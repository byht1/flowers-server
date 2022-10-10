const Flower = require("../../models/modelFlower");

const filterAll = async (req, res) => {
  const {
    id,
    priseMin = 0,
    priseMax = 9999999,
    sorting = "rating,-1",
    page = 1,
    limit = 20,
    status: stat,
    section: sec,
    category: cat,
    sort: s,
    color: col,
    amount: amo,
    size: siz,
    form: f,
  } = req.query;

  const skip = (page - 1) * limit;
  const grading = sorting.split(",");
  const _id = id ? { _id: id.split(",") } : { "": "" };
  const status = stat ? { status: stat.split(",") } : { "": "" };
  const section = sec ? { section: sec.split(",") } : { "": "" };
  const category = cat ? { category: cat.split(",") } : { "": "" };
  const sort = s ? { sort: s.split(",") } : { "": "" };
  const color = col ? { color: col.split(",") } : { "": "" };
  const amount = amo ? { amount: amo.split(",") } : { "": "" };
  const size = siz ? { size: siz.split(",") } : { "": "" };
  const form = f ? { form: f.split(",") } : { "": "" };

  const result = await Flower.find({
    ..._id,
    ...status,
    ...section,
    ...category,
    ...sort,
    ...color,
    ...amount,
    ...size,
    ...form,
    price: { $gte: priseMin, $lte: priseMax },
  })
    .sort({ [grading[0]]: grading[1] })
    .limit(limit)
    .skip(skip);

  const totalObj = await Flower.countDocuments({
    ..._id,
    ...status,
    ...section,
    ...category,
    ...sort,
    ...color,
    ...amount,
    ...size,
    ...form,
    price: { $gte: priseMin, $lte: priseMax },
  });
  const total = result.length;

  res.json({
    result,
    total,
    totalPage: Math.ceil(totalObj / limit),
    currentPage: page,
  });
};

module.exports = filterAll;
