const createJsonError = require("../../errors/createJsonError")
const Joi = require("joi");
const { findTripById } = require("../../repositories.js/tripsRepositories");
const throwJsonError = require("../../errors/throwJsonError");


const schema = Joi.number().positive().integer()

const getTripById = async(req, res) => {
    try {
        
        const { id } = req.params;
        await schema.validateAsync(id);

        const trip = await findTripById(id);
       if(!trip){
        throwJsonError(400, "No se encuentra viaje para ese Id")
       }

       res.status(200)
       res.send(trip)
       
    } catch (error) {
        createJsonError(error, res)
    }
}
module.exports = getTripById