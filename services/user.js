const { User } = require("../model");

const getOne = filter => {
  return User.findOne(filter);
};

const add = ({ email, password }) => {
  const newUser = new User({ email });
  newUser.setPassword(password);
  return newUser.save();
};

const getAll = () => {
  return User.find({});
};

module.exports = { getOne, add, getAll };
