const User = require("../models/usersModel.js");
const bcrypt = require("bcrypt");
const emailValidation = require("../helpers/emailValidation.js");

let loginControllers = async (req, res) => {
    let { email, password } = req.body;

    if (!email) {
        return res.send({ error: "Enter your Email" });
    } else if (!emailValidation(email)) {
        return res.send({ error: "Enter A Valid Email" });
    } else if (!password) {
        return res.send({ error: "Enter Your Password" });
    } else {
        let isEmailExist = await User.find({ email });
        if (isEmailExist.length > 0) {
            bcrypt.compare(
                password,
                isEmailExist[0].password,
                function (err, result) {
                    // result == true
                    if (result) {
                        res.json({
                            success: "Login is Success",
                            fullName: isEmailExist.fullName,
                            email: isEmailExist.email,
                        });
                    } else {
                        res.json({ error: "Password Not Match" });
                    }
                }
            );
        } else {
            res.json({ error: "Email Not Match" });
        }
    }
};

module.exports = loginControllers;
