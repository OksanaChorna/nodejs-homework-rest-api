const { user: service } = require("../../services");
const { schemaSignupUser } = require("../../routes/validate");
const shortid = require("shortid");

const sendMail = require("../../utils");

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = schemaSignupUser.validate(req.body);
  if (error) {
    res.status(404).json({
      status: error,
      code: 400,
      message: "missing required name field",
    });
    return;
  }
  try {
    const result = await service.getOne({ email });
    if (result) {
      res.status(409).json({
        status: "error",
        code: 409,
        message: "Alredy register",
      });
      return;
    }
    const verificationToken = shortid.generate();
    const newUser = await service.add({ email, password, verificationToken });
    const emailToUser = {
      to: email,
      subject: "Подтвердите свой email",
      text: `<a href="http://localhost:3000/api/users/verify/${verificationToken}>Нажмите для подтверждения email</a>"`,
    };
    sendMail(emailToUser);
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Success",
      data: {
        user: {
          email: email,
          subscription: newUser.subscription,
          avatarURL: newUser.avatarURL,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
