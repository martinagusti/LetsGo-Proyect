const createJsonError = require("../../errors/createJsonError")
const throwJsonError = require("../../errors/throwJsonError")
const Joi = require("joi")
const { createFavouritesTrips, findExist, deleteFavourite } = require("../../repositories.js/favouritesRepository")

const schema = Joi.number().positive().integer()

const createFavourites = async (req, res) => {
    try {
        const {id} = req.auth

        const {idTrip} = req.params
       

        schema.validateAsync(idTrip)

        const exist = await findExist(id, idTrip)
        if(exist.length > 0){

            const deleteRow = await deleteFavourite(id, idTrip);
           

            if(deleteRow === 0){
                throwJsonError(400, "No se ha podido eliminar de favoritos")
            }
    
            res.status(200)
            res.send(false)

        }else{
            const inserted = await createFavouritesTrips(id, idTrip)
       
            if(!inserted){
                throwJsonError(400, "No se ha podido guardar el viaje en favoritos")
            }
    
            res.status(200)
            res.send({ID:idTrip, IdUser:id})

        }
       
    } catch (error) {
        createJsonError(error, res)
    }
}

module.exports = createFavourites;