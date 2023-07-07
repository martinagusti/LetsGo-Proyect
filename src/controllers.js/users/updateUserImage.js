const createJsonError = require("../../errors/createJsonError");
const { addAvatarimage, findUserById } = require("../../repositories.js/usersRepository");
const path = require("path");
const fs = require("fs").promises
const randomstring = require("randomstring");
const sharp = require("sharp");
const throwJsonError = require("../../errors/throwJsonError");

const updateUserImage = async(req, res) => {
    try {
        
        const {id, email} = req.auth;
        

        const validateExtension = [".jpeg", ".jpg", ".png", ".JPEG", ".JPG", ".PNG"]
       
        const avatar = req.files.file;
        console.log(avatar)

         if(!avatar){
            throwJsonError(400, "No se ha seleccionado el fichero")
        }
        
        
        const extension =  path.extname(avatar.name)

        if(!validateExtension.includes(extension)){
            throwJsonError(400, "Formato no valido")
        }

        const user = await  findUserById(id)
       
        const {image} = user

        
        const pathTripImage = path.join(__dirname, "../../../public/userImages")
        const random = randomstring.generate(10)
        const imageName = `${id}-${random}${extension}`
        const pathImage = (path.join(pathTripImage, imageName))

        
        
        if(image){
            
            await fs.unlink(path.join(pathTripImage, image))
        }

        const imageSharp = sharp(avatar.data);
         
        await imageSharp.resize(400,400).toFile(pathImage);

        await addAvatarimage(imageName, id);

       
        res.status(200);
        res.send(imageName)

       
    } catch (error) {
        createJsonError(error, res)
    }
}

module.exports = updateUserImage;