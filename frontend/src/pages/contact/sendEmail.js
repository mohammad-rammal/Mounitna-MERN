const nodemailer = require("nodemailer");

module.exports = async (userEmail, subject, htmlTemplete) => {
    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USER_EMAIL_ADDRESS, // sender
                pass: process.env.USER_EMAIL_PASSWORD
            }
        });
        
        const mailOptions = {
            from: process.env.USER_EMAIL_ADDRESS, // sender
            to: userEmail,
            subject: subject,
            html: htmlTemplete,
        }

        const info = await transporter.sendMail(mailOptions);
        console.log("Email Sent: " + info.response);

    } catch (error) {
        console.log(error);
        throw new Error("Internal Server Error (nodemailer");
    }
}