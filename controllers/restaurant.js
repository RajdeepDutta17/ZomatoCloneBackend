const restaurant = require("../models/restaurant");

exports.getAllRestaurants = (req, res) => {
  restaurant
    .find()
    .then((result) => {
      res.status(200).json({
        message: "Restaurant Data Fetched Successfully.",
        restaurants: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Could not fetch the restaurant data.",
        error: error,
      });
    });
};

exports.getAllRestaurantsByLocation = (req, res) => {
  const cityName = req.params.cityName;
  restaurant
    .find({ city: cityName })
    .then((result) => {
      res.status(200).json({
        message: `Restaurant Details For City ${cityName}`,
        restaurants: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Could not fetch the requested details.",
        error: error,
      });
    });
};

exports.getAllRestaurantsByLocationID = (req, res) => {
  const locationId = req.params.locationid;

  restaurant
    .find({ location_id: locationId })
    .then((result) => {
      res.status(200).json({
        message: `Restaurant Details Fetched for locationID:${locationId}.`,
        restaurants: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Could not fetch the requested details.",
        error: error,
      });
    });
};

exports.getAllRestaurantsById = (req, res) => {
  const id = req.params.id;

  restaurant
    .find({ _id: id })
    .then((result) => {
      res.status(200).json({
        message: `Restaurants Details Fetched for _id:${id}.`,
        restaurants: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Could not fetch the requested details.",
        error: error,
      });
    });
};

exports.filterRestaurants = (req, res) => {
  let { mealtype, location, lcost, hcost, cuisine, sort, page, itemsPerPage } =
    req.body;

  sort = sort ? sort : 1;
  page = page ? page : 1;
  itemsPerPage = itemsPerPage ? itemsPerPage : 2;
  let startIndex = page * itemsPerPage - itemsPerPage;
  let endIndex = page * itemsPerPage;

  let filterObj = {};

  mealtype && (filterObj["mealtype_id"] = mealtype);
  location && (filterObj["location_id"] = location);
  cuisine && (filterObj["cuisine_id"] = { $in: cuisine });
  lcost && hcost && (filterObj["min_price"] = { $gte: lcost, $lte: hcost });

  restaurant
    .find(filterObj)
    .sort({ min_price: sort })
    .then((result) => {
      // Pagination Logic
      const filteredResponse = result.slice(startIndex, endIndex);
      const numberOfResponse = Math.ceil(result.length / itemsPerPage);

      let arr = [];
      for (let i = 1; i <= numberOfResponse; i++) {
        arr.push(i);
      }

      res.status(200).json({
        message: "Restaurant Data Fetched according to the provided filters.",
        restaurants: filteredResponse,
        pageCount: arr,
        currentPage: page,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Could not fetch the required documents.",
        error: error,
      });
    });
};

// module.exports = { getAllRestaurants, getAllRestaurantsByLocation };
