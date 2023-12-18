const nodemailer = require("nodemailer");

async function sendEmail(email, verify, template) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hmosmanzakaria@gmail.com",
      pass: "fpjzswnjeujgjeba",
    },
  });

  const info = await transporter.sendMail({
    from: "hmosmanzakaria@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Please Verify Your Email", // Subject line
    html: template(verify), // html body
  });
}

module.exports = sendEmail;
