const express = require("express");

const restaurantController = require("../controllers/restaurant");
const locationController = require("../controllers/location");
const mealtypeController = require("../controllers/mealtype");
const userController = require("../controllers/user");
const menuController = require("../controllers/menu");
const paymentController = require("../controllers/payment");

const route = express.Router();

route.get("/getAllRestaurants", restaurantController.getAllRestaurants);
route.get("/getAllLocations", locationController.getAllLocations);
route.get("/getAllMealtypes", mealtypeController.getAllMealtypes);
route.get(
  "/getAllRestaurants/:cityName",
  restaurantController.getAllRestaurantsByLocation
);
route.get(
  "/getAllRestaurantsByLocationID/:locationid",
  restaurantController.getAllRestaurantsByLocationID
);
route.get(
  "/getAllRestaurantsById/:id",
  restaurantController.getAllRestaurantsById
);
route.get(
  "/getAllMenuItemsByResId/:resid",
  menuController.getAllMenuForRestaurantByResId
);

route.post("/filter", restaurantController.filterRestaurants);
route.post("/signup", userController.userSignup);
route.post("/login", userController.userLogin);
route.post("/payments", paymentController.payment);
module.exports = route;
