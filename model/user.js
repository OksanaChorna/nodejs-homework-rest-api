const { model } = require('mongoose');

const userSchema = require('./schema/userSchema')

const User = model('contact', userSchema)

module.exports = User