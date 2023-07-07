const { getConnection } = require("../infraestructure/database.js");

const findUserByEmail = async (email) => {
  const pool = await getConnection();
  const sql = `SELECT id, name, lastName, userName, email, password, createAt, role, image, verificationCode, bio  FROM users WHERE email = ?`;
  const [user] = await pool.query(sql, email);

  return user[0];
};

const findUserByUserName = async (userName) => {
  const pool = await getConnection();
  const sql = `SELECT id, name, lastName, userName, email, password, createAt, role, image, verificationCode, bio  FROM users WHERE userName = ?`;
  const [user] = await pool.query(sql, userName);

  return user[0];
};

const findUserById = async (id) => {
  const pool = await getConnection();
  const sql = `SELECT id, userName, email, createAt, image, bio FROM users WHERE id = ?`;
  const [user] = await pool.query(sql, id);

  return user[0];
};

const createUser = async (userDB) => {
  const {
    name,
    lastName,
    userName,
    email,
    passwordHash,
    verificationCode,
    bio,
  } = userDB;

  const pool = await getConnection();
  const sql = `INSERT INTO USERS (name, lastName, userName, email, password, verificationCode, bio) VALUES ( ?, ?, ?, ?, ?, ?, ?);`;
  const [created] = await pool.query(sql, [
    name,
    lastName,
    userName,
    email,
    passwordHash,
    verificationCode,
    bio,
  ]);
  console.log(created);
  return created.insertId;
};

const newProfile = async (userData, id) => {
  const { name, lastName, userName, passwordHash, bio } = userData;
  console.log(userData);
  const pool = await getConnection();
  const sql = `UPDATE users SET name=?, lastName=?, userName=?, password=?, bio=? WHERE id = ?`;
  const [created] = await pool.query(sql, [
    name,
    lastName,
    userName,
    passwordHash,
    bio,
    id,
  ]);

  return created.affectedRows;
};

const findUserByCode = async (code) => {
  const pool = await getConnection();
  const sql = `SELECT * FROM users where verificationCode = ?`;
  const [user] = await pool.query(sql, [code]);

  return user[0];
};

const activateUserByCode = async (code) => {
  const now = new Date();
  const pool = await getConnection();
  const sql = `UPDATE users SET createAt = ? WHERE verificationCode = ?`;
  const [user] = await pool.query(sql, [now, code]);

  return true;
};

const addAvatarimage = async (imageName, id) => {
  const pool = await getConnection();
  const sql = `UPDATE users SET image = ? WHERE id = ?`;
  const [user] = await pool.query(sql, [imageName, id]);
  return user.insertId;
};

module.exports = {
  findUserByEmail,
  createUser,
  findUserByCode,
  activateUserByCode,
  findUserById,
  newProfile,
  addAvatarimage,
  findUserByUserName,
};
