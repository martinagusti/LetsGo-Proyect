const { getConnection } = require("../infraestructure/database");

const findFavouritesTrips = async(id) => {
    const pool = await getConnection();
    const sql = `SELECT db_viajes.trips.*, users.userName,COUNT(votes.id) AS votes FROM trips left join favourites on favourites.IdTrip = trips.id left join votes on votes.IdTrip = trips.id left join users on users.id = trips.idUser where favourites.IdUser = ? GROUP BY trips.id ORDER BY votes DESC`;
    const [trips] = await pool.query(sql, [id]);
    
    return trips;
  }

  const createFavouritesTrips = async (id, idTrip) => {
    const pool = await getConnection();
    const sql = `INSERT INTO favourites (IdUser, IdTrip) VALUES (?, ?)`;
   
    const [saved] = await pool.query(sql, [id, idTrip]);
    return saved.insertId;
  }

  const findExist = async (id, idTrip) => {
    const pool = await getConnection();
    const sql = `SELECT * FROM db_viajes.trips left join favourites on favourites.IdTrip = trips.id where favourites.IdUser = ? AND favourites.IdTrip = ?`;
   
    const [exist] = await pool.query(sql, [id, idTrip]);
    
    return exist;
  }

  const deleteFavourite = async (id, idTrip) => {
    const pool = await getConnection();
    const sql = `DELETE FROM favourites  where favourites.IdUser = ? AND favourites.IdTrip = ?`;
   
    const [deleteRow] = await pool.query(sql, [id, idTrip]);
    
    return deleteRow.affectedRows;
  }


  module.exports = {
    findFavouritesTrips,
    createFavouritesTrips,
    findExist,
    deleteFavourite
}
  