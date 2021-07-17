const { contact: service } = require('../../services')
const { contactSchema,
    // updateContactValidate,
    // updateContactStatusValidate
} = require('../../routes/api/validate')

const add = async (req, res, next) => {
    const { error } = contactSchema.validate(req.body)
    if (error) {
    res.status(404).json({
      status: error,
      code: 400,
      message: 'missing required name field'
    })
    return
  }
    const { body } = req
  try {
    const result = await service.add(body);
        res.status(201).json({
            status: 'success',
            code: 201,
            data: {
                result
            }
        })
    }
  catch (error) {
    // if (error.code === 1100) {
    //   error.code = 400
    // }
        next(error);
    }
}

// eslint-disable-next-line eol-last
module.exports = add