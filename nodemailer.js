const nodemailer = require("nodemailer");
require("dotenv").config();

let isReady = false;
let serverError;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
           user: process.env.REACT_APP_CONTACT_EMAIL,
           pass: process.env.REACT_APP_EMAIL_PASSWORD
       }
   });

transporter.verify((error, success) => {
    if (error) {
        serverError = error;
    } else {
        isReady = true;
    }
});
   
const sendMail = (name, sender, message, cb) => {
    if (isReady) {
        transporter.sendMail(
        {
            from: name,
            to: process.env.REACT_APP_CONTACT_EMAIL,
            subject: `Bundles of Kindness: A Message from ${name} (${sender})`,
            html: `<p>${message}</p>`
        }, cb);
    } 
    else {
        console.log(serverError);
    }
}

module.exports = sendMail;