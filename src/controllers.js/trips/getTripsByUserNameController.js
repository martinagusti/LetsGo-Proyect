const createJsonError = require("../../errors/createJsonError");
const Joi = require("joi");
const throwJsonError = require("../../errors/throwJsonError");
const {
  findTripsByUserName,
} = require("../../repositories.js/tripsRepositories");

const schema = Joi.string().min(1).max(100);

const getTripByUserName = async (req, res) => {
  try {
    const { userName } = req.params;

    schema.validateAsync(userName);

    const trips = await findTripsByUserName(userName);

    res.status(200);
    res.send(trips);
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = getTripByUserName;
