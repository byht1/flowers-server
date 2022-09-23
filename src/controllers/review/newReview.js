const path = require("path");
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");

const { basedir } = global;

const { Reviews, reviewsJoi } = require("../../models/reviews");
const { createError } = require("../../helpers");

const avatarsDir = path.join(`${basedir}/../`, "public");

const newReview = async (req, res) => {
  const { error } = reviewsJoi.validate(req.body);

  if (error) {
    throw createError(400, "error in the disability");
  }

  let temp = null;
  const arrayPhoto = [];
  try {
    for (const file of req.files) {
      const { path: tempPath, originalname } = file;
      temp = tempPath;
      const [extension] = originalname.split(".").reverse();
      const newName = `${uuidv4()}.${extension}`;
      const uploadPath = path.join(avatarsDir, newName);
      await fs.rename(tempPath, uploadPath);
      arrayPhoto.push(path.join(newName));
    }

    const { name, text, rating, email } = req.body;

    const result = await Reviews.create({
      name,
      text,
      email,
      rating: Number(rating),
      photo: arrayPhoto,
    });

    res.json(result);
  } catch (error) {
    await fs.unlink(temp);
    createError(401, "Not authorized");
  }
};
module.exports = newReview;
