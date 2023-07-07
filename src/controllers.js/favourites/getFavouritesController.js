const createJsonError = require("../../errors/createJsonError")
const throwJsonError = require("../../errors/throwJsonError")
const { findFavouritesTrips } = require("../../repositories.js/favouritesRepository")



const getFavourites = async (req, res) => {
    try {
        const {id} = req.auth
       


        const trips = await findFavouritesTrips(id)
        
        if(!trips){
            throwJsonError(400, "Se produjo un error al cargar los datos" )
        }


        res.status(200)
        res.send(trips)
    } catch (error) {
        createJsonError(error, res)
    }
}

module.exports = getFavourites;