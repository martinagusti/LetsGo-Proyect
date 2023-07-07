
const path = require("path");
const fs = require("fs").promises
const randomstring = require("randomstring");
const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsonError");
const { addAvatarimage } = require("../../repositories.js/usersRepository");
const { addimage, findUserIdInTrip, findTripById } = require("../../repositories.js/tripsRepositories");
const sharp = require("sharp")

const updateTripImage = async (req, res) =>{
    try {

        const {id, email} = req.auth;
        const {id:idTrip} = req.params;
        
      
        const idUser = await findUserIdInTrip(idTrip)
       
        if(idUser[0].idUser !== id){
            throwJsonError(400, "No puedes actualizar la imagen de otro usuario.")
        }
        
        
        
       
        const validateExtension = [".jpeg", ".jpg", ".png", ".JPEG", ".JPG", ".PNG"]
       
    
         const tripImage = req.files.file;
        
                
        if(!tripImage){
            throwJsonError(400, "No se ha seleccionado el fichero")
        }

        const extension =  path.extname(tripImage.name)

        if(!validateExtension.includes(extension)){
            throwJsonError(400, "Formato no valido")
        }
        

        const trip = await  findTripById(idTrip);

        if(trip.length === 0){
            throwJsonError(400, "No se ha encontrado el viaje")
        }
       
        const {image} = trip

        
        const pathTripImage = path.join(__dirname, "../../../public/tripImages")
        const random = randomstring.generate(10)
        const imageName = `${id}-${random}${extension}`
        const pathImage = (path.join(pathTripImage, imageName))
        console.log(imageName)
        
        
        if(image){
            
            await fs.unlink(path.join(pathTripImage, image))
        }

        const imageSharp = sharp(tripImage.data);
         
        await imageSharp.toFile(pathImage);

        await addimage(imageName, idTrip);
        //dasd

    
        res.status(200);
        res.send({imageName})

       

    } catch (error) {
        createJsonError(error, res)
    }
}

module.exports = updateTripImage;