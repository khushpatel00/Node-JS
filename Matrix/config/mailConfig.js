const nodemailer = require("nodemailer")
const Admin = require("../model/admin.model")


const tarnsporter = nodemailer.createTransport({
    secure: true,
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: "rathodvivek5500@gmail.com",
        pass: "jkhqecybixducnby"
    }
})
return tarnsporter;

function sendMail(to,sub,mes){
    tarnsporter({
        to:to,
        subject:sub,
        html:msg
    });
}
sendMail("rathodvivek5500@gmail.com","Hello Gusy", "hello Budy");