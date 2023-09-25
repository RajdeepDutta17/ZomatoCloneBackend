const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/index");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 10000;
const uri = process.env.DATABASE_URL;

const corsOptions = {
  origin: process.env.REQUEST_URL,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));
app.use("/", route);

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
