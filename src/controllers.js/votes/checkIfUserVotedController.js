const Joi = require("joi");
const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");
const { findIfUserVoted } = require("../../repositories.js/votesRepository");
const { findTripById } = require("../../repositories.js/tripsRepositories");

const schemaId = Joi.number().integer().positive();


const checkIfUserVoted = async (req, res) => {
    try {
      const {id} = req.params;
      const {id: userId} = req.auth;

      await schemaId.validateAsync(id);

      const trip = await findTripById(id);
     
        if(trip.id === null) {
         throwJsonError(400, "Viaje no existe");
        }
        
       
      const isVoted = await findIfUserVoted(id, userId);
      console.log(isVoted)

      if (!isVoted) {
        throwJsonError(400, `Se produjo un error...`)
      }
      res.status(200);
      res.send(isVoted)
     
          
      } catch (error) {
        
        createJsonError(error, res)
      }
  }
 

module.exports = {
    checkIfUserVoted,
    
}