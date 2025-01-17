const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const getAll = require("./getAll");
const getCurrent = require("./getCurrent");
const updateSubscription = require("./updateSubscription");
const updateUserAvatar = require("./updateUserAvatar");
const verify = require("./verify");
const repeatEmailVerify = require("./repeatEmailVerify");

module.exports = {
  getAll,
  signup,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateUserAvatar,
  verify,
  repeatEmailVerify,
};
