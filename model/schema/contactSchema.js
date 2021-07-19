const { Schema } = require('mongoose');

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
    minLength: 2,
    maxLength: 30,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    match: [
        // eslint-disable-next-line no-useless-escape
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
  },
  phone: {
    type: String,
    unique: true,
    required: 'Number phone is required',
    match: /^[0-9]+$/,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false, timestamps: true })

// eslint-disable-next-line eol-last
module.exports = contactSchema