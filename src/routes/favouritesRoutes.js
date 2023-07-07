const express = require("express");

const validateAuth = require("../middlewares/validateAuth");
const getFavourites = require("../controllers.js/favourites/getFavouritesController");

const createFavourites = require("../controllers.js/favourites/createFavouriteController");

const favouriteRoutes = express.Router();

favouriteRoutes.route("/").all(validateAuth).get(getFavourites);
favouriteRoutes.route("/:idTrip").all(validateAuth).post(createFavourites);


module.exports = {
    favouriteRoutes
}