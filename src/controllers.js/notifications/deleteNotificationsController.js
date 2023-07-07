const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");
const {
  deleteAllNotifications,
} = require("../../repositories.js/notificationsRepositories");

const deleteNotifications = async (req, res) => {
  try {
    const { id } = req.auth;
    const { id: idNotification } = req.params;
    if (!id) {
      throwJsonError(
        400,
        "Debes estar logueado para poder realizar esta accion"
      );
    }

    const deleted = await deleteAllNotifications(idNotification);
    console.log(deleted);
    if (!deleted) {
      throwJsonError(400, "Se produjo un error al eliminar las notificaciones");
    }

    res.status(200);
    res.send(` ${deleted.affectedRows} notificaciones eliminadas con exito`);
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = deleteNotifications;
