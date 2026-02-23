const createTransporter = require("../config/mailConfig");



const transporter = await createTransporter();

await transporter.sendMail({
    from: "yourgmail@gmail.com",
    to: "user@gmail.com",
    subject: "Test",
    text: "Hello"
});

res.send("Mail Sent");
