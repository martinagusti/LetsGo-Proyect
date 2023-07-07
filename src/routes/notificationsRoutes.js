const express = require("express");
const notificationsRoutes = express.Router();
const validateAuth = require("../middlewares/validateAuth");

const getNotifications = require("../controllers.js/notifications/notificationsController");
const createNotifications = require("../controllers.js/notifications/createNotificationsController");
const deleteNotifications = require("../controllers.js/notifications/deleteNotificationsController");

//endpoints privados
notificationsRoutes.route("/:id").all(validateAuth).get(getNotifications);
notificationsRoutes
  .route("/create/:id")
  .all(validateAuth)
  .post(createNotifications);
notificationsRoutes
  .route("/delete/:id")
  .all(validateAuth)
  .delete(deleteNotifications);

module.exports = {
  notificationsRoutes,
};
