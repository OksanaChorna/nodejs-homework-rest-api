const jwt = require("jsonwebtoken");
require("dotenv").config();

const { user: service } = require("../../services");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await service.getOne({ email });
    if (!user || !user.comparePassword(password)) {
      res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Email or password is wrong",
      });
      return;
    }
    const { SECRET_KEY } = process.env;
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY);
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Success",
      data: {
        result: token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
