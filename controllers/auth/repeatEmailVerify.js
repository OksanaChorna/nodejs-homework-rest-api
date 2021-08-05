const { user: service } = require("../../services");
const sendMail = require("../../utils");

const repeatEmailVerify = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await service.getOne({ email });
    if (user) {
      const { verify, verifyToken, email } = user;
      if (!verify) {
        //   const verifyToken = shortid.generate();
        //   const newUser = await service.add({ email, password, verifyToken });
        const emailToUser = {
          to: email,
          subject: "Подтвердите свой email",
          text: `<a href="http://localhost:3000/api/users/verify/${verifyToken}>Нажмите для подтверждения email</a>"`,
        };
        sendMail(emailToUser);
        return res.status(200).json({
          status: "success",
          code: 200,
          message: "Verification email sent",
        });
      }
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Email has been verified",
      });
    }
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Verification has already been passed",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = repeatEmailVerify;
