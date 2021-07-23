// const jwt = require("jsonwebtoken");
// const { token } = require("morgan");
require("dotenv").config();

// const { user: service } = require("../../services");

const getCurrent = async (req, res, next) => {
  const { subscription, email } = req.user;
  // const userCurrent = {
  //   email: req.user.email,
  //   subscription: req.user.subscription,
  // };

  res.json({
    status: "success",
    code: 200,
    data: {
      email: email,
      subscription: subscription,
    },
  });
};

module.exports = getCurrent;
