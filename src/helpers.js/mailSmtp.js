const nodemailer = require("nodemailer")

const {
    SMTP_PORT,
    SMTP_HOST,
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM
} = process.env

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    }
})

const sendEmailRegister = async(name, lastname, email, code) => {
    const {HTTP_SERVER} = process.env
    const linkActivacion = `${HTTP_SERVER}/api/v1/users/activation?code=${code}`
    console.log(linkActivacion)
    const mailData = {
        from: SMTP_FROM,
        to: email,
        subject: "Welcome to Viajes Recomendados App",
        text:`Hi ${name} ${lastname}, to confirm the account go to this link: ${linkActivacion}`,
        html:`<h1>Hi ${name} ${lastname}, to confirm the account go to this link: ${linkActivacion}</h1>`
    }
    console.log(mailData)

    const data = await transporter.sendMail(mailData)
    console.log("data", data)
    return true;
}

const sendEmailConfirmation = async(email) => {
    
    const mailData = {
        from: SMTP_FROM,
        to: email,
        subject: "Confirmation",
        text:`Welcome to Viajes recomendados App, your account was confirmed!`,
        html:`<h1>Welcome to Viajes recomendados App, your account was confirmed!</h1>`
    }
 
    const data = await transporter.sendMail(mailData)
    console.log("data", data)
    return true;
}



module.exports = {sendEmailRegister, sendEmailConfirmation};