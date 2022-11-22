const mongoose = require("mongoose");

const app = require("./src/app");

const { DB_HOST, PORT = 3000 } = process.env;

app.use("/", (req, res) => {
  res.json({ message: "start" });
});

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => console.log("Database connection successful"))
  )
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
