const createJsonError = require("../../errors/createJsonError");
const throwJsonError = require("../../errors/throwJsonError");
const { findTripsNearby } = require("../../repositories.js/tripsRepositories");
const Joi = require("joi")





const schema = Joi.number().positive().integer().max(15000)

const getTripsNearby = async (req, res) => {
    try {
        console.log(req.body)
        
        const {distance} = req.params
        await schema.validateAsync(distance)

        const trips = await findTripsNearby()
        
    
        if(!trips){
            throwJsonError(400, "Se produjo un error")
        }
    
        //************************************************ */
        
        const ubicacion = {
            lat: req.body.lat,
            lng: req.body.long
        }
        
        const getDistance = (lat1, lon1, lat2, lon2) => {
        
            let r = 6371;
            let dLat = deg2rad(lat2-lat1);
            let dLon = deg2rad(lon2-lon1);
        
            let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2)
        
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
            var d = r * c;
            return d;
        
        }
        
        function deg2rad(n){
          return n * (Math.PI/180);
        }
        
        
        
        const nuevoArray =  trips.map((element)=>{
          const distancia = getDistance(element.latitude, element.longitude, ubicacion.lat, ubicacion.lng )
          element.distance = Math.round(distancia)
          
          return element
          
        })
        
        
        
        const tripsNearby = (nuevoArray.sort((a, b)=> {return a.distance - b.distance}))

         const result = tripsNearby.filter((element) => {
            return element.distance < distance
        })
        


        //************************************************ */

        
        /* if(result.length === 0){
            throwJsonError(400, `No se han encontrado viajes a menos de ${distance} km`)
        } */
        
        res.status(200)
        res.send(result)
    } catch (error) {
        createJsonError(error, res)
    }
}

module.exports = getTripsNearby;