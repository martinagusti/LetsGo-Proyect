const Joi = require("joi");
const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");
const { VotesByTripById, addVote, findIsAlreadyVoted, deleteVote } = require("../../repositories.js/votesRepository");
const { findTripById } = require("../../repositories.js/tripsRepositories");


const schemaId = Joi.number().integer().positive();


const controllerVotes = async (req, res) => {
    try {
      const {id} = req.params;
      await schemaId.validateAsync(id);

      const trip = await findTripById(id);
     
        if(trip.id === null) {
         throwJsonError(400, "Viaje no existe");
        }
        
       
      const votes = await VotesByTripById(id);
      
      if (!votes) {
        throwJsonError(400, `No hay votos en el viaje con la ID :${id}`)
      }
      res.status(200);
      res.send(votes)
      console.log(`${votes.length} votos encontrados para el viaje con esta ID`)
          
      } catch (error) {
        
        createJsonError(error, res)
      }
  }
 

const newVote = async (req, res) => {
    try {
      
        const { id } = req.auth;
        const {id: idTrip} = req.params;

       
       
        await schemaId.validateAsync(idTrip);
       
        const trip = await findTripById(idTrip);
       
        
       
        if(!trip) {
            throwJsonError(400, "Viaje no existe");
           }

          
           const isVoted = await findIsAlreadyVoted(id, idTrip)

          if(isVoted.length > 0){
           const idVote = await deleteVote(id, idTrip)

           if(idVote !== 1){
            throwJsonError(400, "No se ha podido eliminar el voto")
           }
            res.status(200)
            res.send(`Voto eliminado con exito`)
          }else{
            const voteId = await addVote(id, idTrip)
        
            res.status(200)
            res.send({voteId})

          }
        
        
    } catch (error) {
        console.error("error");
        createJsonError(error, res)
        
    }
}

module.exports = {
    controllerVotes,
    newVote
}