const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

global.basedir = __dirname;

const productRouter = require("./routes/product");
const reviewsRouts = require("./routes/reviews");
const flowersRouts = require("./routes/flower");
const authRouts = require("./routes/auth");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/product", productRouter);

app.use("/reviews", reviewsRouts);
app.use("/flowers", flowersRouts);
app.use("/user", authRouts);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
