const createJsonError = require("../../errors/createJsonError")
const Joi = require("joi")
const { findComentaries } = require("../../repositories.js/comentariesRepositories")
const throwJsonError = require("../../errors/throwJsonError")
const { findTripById } = require("../../repositories.js/tripsRepositories")

const schema = Joi.number().positive().integer()


const getComentaries = async(req, res) => {
    try {
        const {id} = req.params

        await schema.validateAsync(id)

        const trip = await findTripById(id);
      
        if(trip.id === null) {
         throwJsonError(400, "Viaje no existe");
        }

        const comentaries = await findComentaries(id)

        if(!comentaries){
            throwJsonError(400, "Se produjo un error")
        }

        res.status(200)
        res.send(comentaries)

    } catch (error) {
        createJsonError(error, res)
    }
    
}

module.exports = getComentaries