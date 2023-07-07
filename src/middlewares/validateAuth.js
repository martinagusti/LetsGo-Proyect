
const jwt = require("jsonwebtoken");
const throwJsonError = require("../errors/throwJsonError");
const createJsonError = require("../errors/createJsonError");

const extractAccessToken = (headers) => {
 const {authorization} = headers;

    if(!authorization || !authorization.startsWith("Bearer ")){
        throwJsonError(403, "Autorizacion requerida")
    }

    return authorization.split(" ")[1]
}

const validateAuth = (req, res, next) => {
    try {
        
        const {headers} = req;
        const {JWT_SECRET} = process.env
        const token = extractAccessToken(headers)
        const decodeToken = jwt.verify(token, JWT_SECRET)
        const {id, userName, email, role} = decodeToken;
        req.auth = {id, userName, email, role}

        next()
    } catch (error) {
        createJsonError(error, res)
    }
}

module.exports = validateAuth;