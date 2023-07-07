const Joi = require("joi");
const createJsonError = require("../../errors/createJsonError");

const throwJsonError = require("../../errors/throwJsonError");
const { addComment } = require("../../repositories.js/comentariesRepositories");
const { findTripById } = require("../../repositories.js/tripsRepositories");

const schema = Joi.number().positive().required();
const schemaBody = Joi.object().keys({
    comentaries: Joi.string().min(1).max(500).required()
})

const createComentarieByIdTrip = async (req, res) => {
    try {
        const { id } = req.auth;
        if(!id){
            throwJsonError(400, "Debes estar logueado para poder realizaresta accion")
        }
        const {id: idTrip} = req.params;
      
        await schema.validateAsync(idTrip);
        const { body } = req;
        await schemaBody.validateAsync(body);
        const trip = await findTripById(idTrip);
      
        if(trip.id === null) {
         throwJsonError(400, "Viaje no existe");
        }

        let {comentaries} = body;


        const commentId = await addComment(id, idTrip, comentaries);
       
    
    res.status(200)
    res.send([{commentId, id, idTrip, comentaries}])
    } catch (error) {
       
        createJsonError(error, res)
    }
}

module.exports = {
    createComentarieByIdTrip,
}