const Joi = require("joi");
const createJsonError = require("../../errors/createJsonError");
const { addTrip, updateTripRepository } = require("../../repositories.js/tripsRepositories");
const throwJsonError = require("../../errors/throwJsonError");



const schema = Joi.object().keys({
    title: Joi.string().max(250).required(),
    dateExperience: Joi.date().required(),
    category: Joi.string().valid("viaje-familiar","viaje-negocios","viaje-cultural","viaje-gastronomico","viaje-diversion","viaje-playero","viaje-rural","viaje-naturaleza","viaje-low-cost").required(),
    city: Joi.string().max(200).required(),
    excerpt: Joi.string().max(300).required(),
    description: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required()

})

const updateTrip = async (req, res) => {
    
    try {
         const {body} = req;
        
         const {id:idTrip} = req.params;
        
       
         await schema.validateAsync(body);

 
        const updatedTrip = await updateTripRepository(body, idTrip);
        
        if(!updatedTrip){
            throwJsonError(400, "No se ha podido actualizar el viaje.")
        }
       
    
       res.status(201);
       res.send({idTrip, body})

        
    } catch (error) {
        createJsonError(error, res)
    }
}

module.exports = updateTrip;