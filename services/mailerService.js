const nodemailer = require("nodemailer");
const Handlebars = require("handlebars");
const path = require("path");
const fs = require("fs");
const {MAILER_PASSWORD, GMAIL} = require("../constants/index")


const sendMail = async (email, firstName, templateName) =>{
    try {
        const templatePath = path.join(__dirname, "../templates", `${templateName}.hbs`);
        const templateExists = fs.existsSync(templatePath);
        if(!templateExists) throw {message:`Template ${templateName} does not exist`}

        const templateContent = fs.readFileSync(templatePath, "utf-8")
        const template = Handlebars.compile(templateContent)
        const html = template({firstName})

        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:GMAIL,
                pass:MAILER_PASSWORD
            }
        })

        const sendEmail = await transporter.sendMail({
            from:GMAIL,
            to:email,
            subject: "Welcome Mail",
            html: html
        })

        
    } catch (error) {
        throw error
    }
};

module.exports = { sendMail };