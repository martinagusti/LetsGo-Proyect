const express = require("express");
const votesRoutes = express.Router();
const validateAuth = require("../middlewares/validateAuth");
const { controllerVotes, NewVote, newVote } = require("../controllers.js/votes/votesController");
const { checkIfUserVoted } = require("../controllers.js/votes/checkIfUserVotedController");

//endpoints publicos
votesRoutes.get('/:id', controllerVotes);

//endpoints privados
votesRoutes.route("/:id").all(validateAuth).post(newVote);
votesRoutes.route("/like/:id").all(validateAuth).get(checkIfUserVoted);


module.exports = {votesRoutes}