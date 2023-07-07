const Joi = require("joi");
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");

const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsonError");

const { sendEmailRegister } = require("../../helpers.js/mailSmtp");
const {
  findUserByEmail,
  createUser,
  findUserByUserName,
} = require("../../repositories.js/usersRepository");

const schema = Joi.object().keys({
  name: Joi.string().min(4).max(120).required(),
  lastName: Joi.string().min(4).max(120).required(),
  userName: Joi.string().min(4).max(120).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
  verifyPassword: Joi.string().required().valid(Joi.ref("password")),
  bio: Joi.string().min(4).max(500),
});

const registerUser = async (req, res) => {
  try {
    const { body } = req;

    await schema.validateAsync(body);

    const { name, lastName, userName, email, password, bio } = body;

    const user = await findUserByEmail(email);

    if (user) {
      throwJsonError("409", `El usuario ${email} no esta disponible`);
    }

    const validUsername = await findUserByUserName(userName);
    if (validUsername) {
      throwJsonError("409", `El usuario ${userName} no esta disponible`);
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const verificationCode = randomstring.generate(64);

    const userDB = {
      name,
      lastName,
      userName,
      email,
      passwordHash,
      verificationCode,
      bio,
    };

    const userId = await createUser(userDB);

    await sendEmailRegister(name, lastName, email, verificationCode);

    res.status(201);
    res.send([userDB]);
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = registerUser;
