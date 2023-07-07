const { getConnection } = require("../infraestructure/database");

const findNotifications = async (id) => {
  const pool = await getConnection();
  const sql = `SELECT notifications.*, users.userName, users.image, trips.title FROM db_viajes.notifications left join trips on trips.ID = notifications.IdTrip left join users on users.ID = notifications.idUser where trips.IdUser = ? order by ID desc`;
  const [notifications] = await pool.query(sql, [id]);

  return notifications;
};

const createNewNotification = async (id, idTrip, action) => {
  const pool = await getConnection();
  const sql = `INSERT INTO notifications (idUser, idTrip, action)
  VALUES (?, ?, ?)`;
  const [notifications] = await pool.query(sql, [id, idTrip, action]);

  return notifications;
};

const deleteAllNotifications = async (id) => {
  const pool = await getConnection();
  const sql = `DELETE notifications from notifications left join trips on trips.ID = notifications.IdTrip WHERE notifications.ID = ?`;
  const [deleted] = await pool.query(sql, [id]);

  return deleted;
};

module.exports = {
  findNotifications,
  createNewNotification,
  deleteAllNotifications,
};
