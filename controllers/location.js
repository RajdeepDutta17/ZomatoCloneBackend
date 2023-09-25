const location = require("../models/location");

exports.getAllLocations = (req, res) => {
  location
    .find()
    .then((result) => {
      res.status(200).json({
        message: "Location Data Fetched Successfully.",
        locations: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Could not fetch the location data.",
        error: error,
      });
    });
};

// module.exports = getAllLocations;
