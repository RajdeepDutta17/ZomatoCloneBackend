const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/index");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;
const uri = process.env.DATABASE_URL;

// const whiteList = [
//   "https://zomatoclonefrontend.onrender.com/",
//   "http:localhost:3000",
// ];

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whiteList.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by cors"));
//     }
//   },
//   optionsSuccessStatus: 200,
// };

app.use(express.json());
app.use(express.static("public"));
app.use(cors());
// app.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://zomatoclonefrontend.onrender.com"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });
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
