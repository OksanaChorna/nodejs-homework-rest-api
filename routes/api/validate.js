// const Joi = require('joi')

// const contactSchema = Joi.object({
//   name: Joi.string().alphanum().min(2).max(30).required(),
//   email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
//   phone: Joi.string().pattern(/^[0-9]+$/).required(),
//   favorite: Joi.boolean().optional()
// })

// const schemaUpdate = Joi.object({
//   name: Joi.string().alphanum().min(2).max(30).optional(),
//   email: Joi.string().email({
//     minDomainSegments: 2,
//     tlds: { allow: ['com', 'net'] },
//   }),
//   phone: Joi.string()
//     .pattern(/^[0-9]+$/)
//     .optional(),
//   favorite: Joi.boolean().optional()
// }).min(1)

// module.exports = {
//   contactSchema,
//   schemaUpdate
// }

// const validate = (schema, body, next) => {
//   const { error } = schema.validate(body)
//   if (error) {
//     const [{ message }] = error.details
//     return next({
//       status: 400,
//       message: `Field: ${message.replace(/"/g, '')}`,
//     })
//   }
//   next()
// }

// module.exports.createContact = (req, _res, next) => {
//   return validate(contactSchema, req.body, next)
// }
// module.exports.updateContactValidate = (req, _res, next) => {
//   return validate(schemaUpdate, req.body, next)
// }
