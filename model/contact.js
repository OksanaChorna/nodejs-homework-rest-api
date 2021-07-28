const { model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const contactSchema = require("./schema/contactSchema");

contactSchema.plugin(mongoosePaginate);
const Contact = model("contact", contactSchema);

// eslint-disable-next-line eol-last
module.exports = Contact;
