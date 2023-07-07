const createJsonError = require("../../errors/createJsonError")
const Joi = require("joi");
const throwJsonError = require("../../errors/throwJsonError");
const { findUserById } = require("../../repositories.js/usersRepository");


const schema = Joi.number().integer().positive();


const getUserInfo = async(req, res) => {
    try {
        const {id} = req.params
        await schema.validateAsync(id);

        const userInfo = await findUserById(id);

        if(!userInfo){
            throwJsonError(400, "No se ha encontrado un usuario para ese id")
        }

        res.status(200)
        res.send(userInfo)

    } catch (error) {
        createJsonError(error, res)
    }
}

module.exports = getUserInfo;