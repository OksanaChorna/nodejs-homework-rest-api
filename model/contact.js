const { model } = require('mongoose');

const contactSchema = require('./schema/contactSchema')

const Contact = model('contact', contactSchema)

// eslint-disable-next-line eol-last
module.exports = Contact