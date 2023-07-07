const createJsonError = require("../../errors/createJsonError");
const Joi = require("joi");
const throwJsonError = require("../../errors/throwJsonError");
const {
  findNotifications,
} = require("../../repositories.js/notificationsRepositories");

const schema = Joi.number().positive().integer();

const getNotifications = async (req, res) => {
  try {
    const { id } = req.auth;
    if (!id) {
      throwJsonError(
        400,
        "Debes estar logueado para poder realizar esta accion"
      );
    }

    const { id: idUser } = req.params;

    await schema.validateAsync(idUser);

    const notifications = await findNotifications(idUser);

    console.log(notifications);
    if (!notifications) {
      throwJsonError(400, "Se produjo un error al cargar las notificaciones");
    }

    res.status(200);
    res.send(notifications);
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = getNotifications;
