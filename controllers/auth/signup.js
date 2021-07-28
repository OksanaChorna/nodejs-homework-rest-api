const { user: service } = require("../../services");
const { schemaSignupUser } = require("../../routes/validate");

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
    const newUser = await service.add({ email, password });
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Success",
      data: {
        user: {
          email: email,
          subscription: newUser.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
