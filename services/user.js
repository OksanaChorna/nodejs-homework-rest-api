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

const getCurrent = id => {
  return User.findById(id);
};

const updateById = (id, body) => {
  return User.findByIdAndUpdate(id, { ...body }, { new: true });
};

module.exports = { add, getOne, getAll, getCurrent, updateById };
