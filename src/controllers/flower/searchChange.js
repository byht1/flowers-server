const Flower = require("../../models/modelFlower");

const searchChange = async (req, res) => {
  const { name: searchName } = req.params;

  const result = await (
    await Flower.find({}, "name image")
  ).filter(({ name }) => name.toLowerCase().includes(searchName.toLowerCase()));

  if (result.length === 1) {
    const data = await Flower.findById(result[0].id);

    res.json(data);
    return;
  }

  res.json(result);
};

module.exports = searchChange;
