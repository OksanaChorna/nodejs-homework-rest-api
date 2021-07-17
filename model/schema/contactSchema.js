const { Schema } = require('mongoose');

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
    minLength: 2,
    maxLength: 50,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false, timestamps: true })

// eslint-disable-next-line eol-last
module.exports = contactSchema