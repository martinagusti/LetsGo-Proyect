const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");
const { sendEmailConfirmation } = require("../../helpers.js/mailSmtp");
const { activateUserByCode, findUserByCode } = require("../../repositories.js/usersRepository");



const activateUser = async (req, res ) => {

        try {
            const {code} = req.query;
            if(!code){
                throwJsonError(400, "Codigo no valido");
            }

            console.log(code)
            const user = await findUserByCode(code)
           
           if(!user){
            throwJsonError(400, "Codigo no encontrado")
           }

           const {email} = user


          const activated =   await activateUserByCode(code)

            if(!activated){
                throwJsonError(400, "No se ha podido verificar")
            }

            

            const confirmated = await sendEmailConfirmation(email)

            if(!confirmated){
                throwJsonError(400, "No se ha podido confirmar")
            }

            res.status(200)
            res.send(`Usuario verificado correctamente!`)
        } catch (error) {
            createJsonError(error, res)
        }
}

module.exports = activateUser;