const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/index");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3500;
const uri = process.env.DATABASE_URL;

const whitelist = [
  "http://localhost:3000",
  "https://zomatoclonefrontend.onrender.com",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
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
