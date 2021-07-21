const { model } = require("mongoose");

const userSchema = require("./schema/userSchema");

const User = model("user", userSchema);

module.exports = User;
