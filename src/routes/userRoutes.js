const express = require("express");
const registerUser = require("../controllers.js/users/registerUser");
const activateUser = require("../controllers.js/users/activateUser");
const loginUser = require("../controllers.js/users/loginUser");
const getUserInfo = require("../controllers.js/users/getUserInfo");
const validateAuth = require("../middlewares/validateAuth");
const updateProfile = require("../controllers.js/users/updateProfile");
const updateUserImage = require("../controllers.js/users/updateUserImage");

const userRoutes = express.Router();

//endpoints publicos
userRoutes.post("/", registerUser)
userRoutes.get("/activation", activateUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/:id", getUserInfo);

//endpoints privados
userRoutes.route("/updateprofile").all(validateAuth).patch(updateProfile);
userRoutes.route("/uploadImage").all(validateAuth).patch(updateUserImage);

module.exports = {
    userRoutes
}