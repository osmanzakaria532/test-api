const emailValidation = require("../helpers/emailValidation.js");
const User = require("../models/usersModel.js");
const bcrypt = require("bcrypt");

const otpTemplate = require("../helpers/otpTemplate.js");
const sendEmail = require("../helpers/sendEmail.js");

const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");

let registrationControllers = async (req, res) => {
    const { fullName, email, password, avatar, facebookId, linkedinId } =
        req.body;

    if (!fullName) {
        return res.send({ error: "Enter FullName" });
    } else if (!email) {
        return res.send({ error: "Enter your Email" });
    } else if (!emailValidation(email)) {
        return res.send({ error: "Enter A Valid Email" });
    } else if (!password) {
        return res.send({ error: "Enter Your Password" });
    } else {
        let duplicateEmail = await User.find({ email: email });
        if (duplicateEmail.length > 0) {
            return res.send({
                error: "Email Already Exists, Try Another Email",
            });
        }
        bcrypt.hash(password, 10, async function (err, hash) {
            const user = new User({
                fullName,
                email,
                password: hash,
                avatar,
                facebookId,
                linkedinId,
            });
            user.save();
            const generator2 = aleaRNGFactory(Date.now());
            let randomNumber = generator2.uInt32().toString().substring(0, 4);

            let randomOtpStore = await User.findOneAndUpdate(
                { email },
                { $set: { randomOtp: randomNumber } },
                { new: true }
            );

            sendEmail(email, randomNumber, otpTemplate);

            // setTimeout(async function () {
            //     let randomOtpStore = await User.findOneAndUpdate(
            //         { email },
            //         { $unset: { randomOtp: "" } },
            //         { new: true }
            //     );
            //     console.log("OTP Deleted");
            // }, 25000);

            res.send({
                success: "Registration is Success, Please Check Your Email",
                fullName: user.fullName,
                email: user.email,
            });
        });
    }
};
module.exports = registrationControllers;
