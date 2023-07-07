const { getConnection } = require("../infraestructure/database");

const addComment = async(idUser, idTrip, commentaries, votes) => {
    const pool = await getConnection();
    const sql = `
    INSERT INTO comentaries (idUser, idTrip, comentaries)
    VALUES (?, ?, ?)`
    ;
    
    const [created] = await pool.query(sql, [idUser, idTrip, commentaries]);

    return created.insertId;

}



const findComentaries = async (id) => {
    const pool = await getConnection();
    const sql = `SELECT  comentaries.*, username, email, image FROM comentaries left join users on users.id = comentaries.idUser where IdTrip = ?`;
    
    const [comentaries] = await pool.query(sql, [id]);
   
    return comentaries
}
    

module.exports = {
    addComment,
    findComentaries
}