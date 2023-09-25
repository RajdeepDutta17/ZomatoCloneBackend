const menu = require("../models/menu");

exports.getAllMenuForRestaurantByResId = (req, res) => {
  const resid = req.params.resid;

  menu
    .find({ restaurant_id: resid })
    .then((result) => {
      res.status(200).json({
        message: "Items Fetched Successfully.",
        items: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Could not fetch the requested data.",
        error: err,
      });
    });
};
