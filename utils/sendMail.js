// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const { EMAIL_PASSWORD } = process.env;

// const nodemailerConfig = {
//   host: "smtp.meta.ua",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "ksublack@meta.ua",
//     pass: EMAIL_PASSWORD,
//   },
// };

// const transporter = nodemailer.createTransport(nodemailerConfig);

// // const mail = {
// //   from: "ksublack@meta.ua",
// //   to: "ksuchorna@gmail.com",
// //   subject: "Test email",
// //   text: "Test email",
// // };

// // transporter.sendMail(mail);

// const sendMail = async ({ to, subject, text }) => {
//   const mail = {
//     from: "ksublack@meta.ua",
//     to,
//     subject,
//     text,
//   };

//   // eslint-disable-next-line no-useless-catch
//   try {
//     const result = await transporter.sendMail(mail);
//     return result;
//   } catch (error) {
//     throw error;
//   }
// };

// module.exports = sendMail;

const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async ({ to, subject, text, html }) => {
  const msg = {
    to,
    from: "ksuchorna@gmail.com", // Change to your verified sender
    subject,
    text,
    html,
  };
  // eslint-disable-next-line no-useless-catch
  try {
    const answer = sgMail.send(msg);
    return answer;
  } catch (error) {
    throw error;
  }
};

module.exports = sendMail;
