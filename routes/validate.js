const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .required(),
  favorite: Joi.boolean().optional(),
});

const schemaUpdate = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).optional(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .optional(),
  favorite: Joi.boolean().optional(),
}).min(1);

const schemaUpdateStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemaSignupUser = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "de"] },
    })
    .required(),
  password: Joi.string().required(),
});

const schemaLoginUser = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "de"] },
    })
    .optional(),
  password: Joi.string().optional(),
});

const schemaUpdateUserSubscription = Joi.object({
  subscription: Joi.string().required(),
});

module.exports = {
  contactSchema,
  schemaUpdate,
  schemaUpdateStatusContact,
  schemaSignupUser,
  schemaLoginUser,
  schemaUpdateUserSubscription,
};

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

// module.exports = {
//   createContactValidate: (req, _res, next) => {
//     return validate(contactSchema, req.body, next);
//   },
//   updateContactValidate: (req, res, next) => {
//     return validate(schemaUpdate, req.body, next);
//   },
//   updateContactStatusValidate: (req, res, next) => {
//     return validate(schemaUpdateStatusContact, req.body, next);
//   },
// };
