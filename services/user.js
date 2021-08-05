const { User } = require("../model");

const getOne = filter => {
  return User.findOne(filter);
};

const add = ({ password, ...other }) => {
  // other - email, verificationToken
  const newUser = new User(other);
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

const updateAvatar = (id, avatarURL) => {
  return User.findByIdAndUpdate(id, { avatarURL });
};

module.exports = { add, getOne, getAll, getCurrent, updateById, updateAvatar };
