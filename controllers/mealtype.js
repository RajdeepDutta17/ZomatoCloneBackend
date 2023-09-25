const mealtype = require("../models/mealtype");

exports.getAllMealtypes = (req, res) => {
  mealtype
    .find()
    .then((result) => {
      res.status(200).json({
        message: "Mealtype Data Fetched Successfully.",
        mealtypes: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Could not fetch the mealtype data.",
        error: error,
      });
    });
};

// module.exports = getAllMealtypes;
