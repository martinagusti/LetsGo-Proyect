const { getConnection } = require("../infraestructure/database");

const VotesByTripById = async (IdTrip) => {
    const pool = await getConnection();
    const sql = `SELECT * FROM votes WHERE IdTrip = ?`;
    const [votes] = await pool.query(sql, [IdTrip]);
  
    return votes;
  };

const addVote = async(idUser, idTrip) => {
    const pool = await getConnection();
    const sql = `
    INSERT INTO votes (idUser, IdTrip)
    VALUES (?, ?)
    `;
    const [created] = await pool.query(sql, [idUser, idTrip]);
      console.log(created)
    return created.insertId;
}

const findIsAlreadyVoted = async (id, idTrip) => {
  const pool = await getConnection();
  const sql = `SELECT * FROM votes where idUser = ? AND idTrip = ?`;
  const [voted] = await pool.query(sql, [id, idTrip]);
    
  return voted
}

const deleteVote = async (id, idTrip) => {
  const pool = await getConnection();
  const sql = `DELETE FROM votes WHERE idUser = ? AND idTrip = ?`;
  const [deleted] = await pool.query(sql, [id, idTrip]);
   
  return deleted.affectedRows;
}

const findIfUserVoted = async (id, userId) => {
  const pool = await getConnection();
  const sql = `SELECT * FROM db_viajes.votes where IdUser = ? AND IdTrip = ?`;
  const [isVoted] = await pool.query(sql, [userId, id]);
   
  return isVoted
}

  module.exports = {
    VotesByTripById,
    addVote, 
    findIsAlreadyVoted, 
    deleteVote,
    findIfUserVoted
  }