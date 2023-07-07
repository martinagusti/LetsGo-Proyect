const createJsonError = require("../../errors/createJsonError");
const Joi = require("joi");
const throwJsonError = require("../../errors/throwJsonError");
const {
  createNewNotification,
} = require("../../repositories.js/notificationsRepositories");
const { findTripById } = require("../../repositories.js/tripsRepositories");

const schema = Joi.number().positive().integer();
const schemaBody = Joi.object().keys({
  action: Joi.string().valid("like", "comment").required(),
});

const createNotifications = async (req, res) => {
  try {
    const { id } = req.auth;
    if (!id) {
      throwJsonError(
        400,
        "Debes estar logueado para poder realizar esta accion"
      );
    }

    const { id: idTrip } = req.params;

    await schema.validateAsync(idTrip);

    const { body } = req;
    await schemaBody.validateAsync(body);

    let { action } = body;

    const trip = await findTripById(idTrip);
    console.log(trip);
    if (!trip.ID) {
      throwJsonError(400, "No se ha encontrado el viaje");
    }

    const newNotification = await createNewNotification(id, idTrip, action);

    if (newNotification.affectedRows !== 1) {
      throwJsonError(400, "Se produjo un error al enviar las notificaciones");
    }

    res.status(200);
    res.send({ idTrip: idTrip, action: action });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = createNotifications;
