const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");
const { deleteTrip } = require("../../repositories.js/tripsRepositories");
const Joi = require("joi")

const schema = Joi.number().positive().integer()

const deleteTripController = async (req, res) => {
  try {
    const { id } = req.params;
    const { auth } = req;

   
    await schema.validateAsync(id)

    const trip = await deleteTrip(id, auth.id);

    if (!trip) {
      throwJsonError(400, "Recomendacion no encotrada")
    }

    return res
      .status(200)
      .json({ message: `Recomendación borrada correctamente` });
  } catch (error) {
    createJsonError(error, res)
  }
};

module.exports = {
  deleteTripController,
};