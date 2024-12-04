const jsonweb = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const User = require("../../db_modals/userSchema");


exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        console.log("Empty Feild");
        res.status(400).json({ error: "Empty Feild" }); 
    }
    try {
        const findemail = await User.findOne({ email: email });
        if (!findemail) {
            console.log("Email not found.");
            res.status(422).json({ error: "Email not found." });
        }
        else {
            // console.log('Email:', process.env.EMAIL);
            // console.log('Password:', process.env.PASSWORD);

            const token = jsonweb.sign({ id: findemail._id }, process.env.KEY, { expiresIn: "5m" }); // Generating Temporaly Token to verify Reset Password User,expires in 5m. 
            console.log(token);

            // Code to send Reset Link to User Email
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 465,
                secure: true,
                logger: true,
                debug: true,
                secureConnection: false,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                },
                tls: {
                    rejectUnauthorized: true
                }
            });

            var mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Reset Password Link',
                // text: `http://localhost:3000/resetPassword/${token}`  // forntend component link to open the rest page.
                html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <p style="color: #333;">Hello,</p>
                <p style="color: #555; font-size: 16px;">To reset your password, please click the following link:</p>
                <a href="http://localhost:3000/reset/${token}" style="display: inline-block; padding: 10px 20px; color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px; margin: 10px 0;">Reset Password</a>
                <p style="color: #555; font-size: 16px;">The link is valid only for 5 minutes.</p>
                <p style="color: #555; font-size: 16px;">If you did not request a password reset, please ignore this email.</p>
                <br>
                <img src="https://drive.google.com/file/d/1TPjYT71XHStCNa1UMeRJblVOqjPK4T5G/view?usp=sharing" style="display: block; margin: 20px auto; border-radius: 10px;" alt="Example Image" />
                <p style="color: #777; font-size: 14px; text-align: center;">Best regards,<br>Your Company</p>
                </div>
                `
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    res.status(500).json({ error: "Error in sending Link." });
                } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).json({ message: "Reset Link sent to your registered email id." });
                }
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error." });
    }
}