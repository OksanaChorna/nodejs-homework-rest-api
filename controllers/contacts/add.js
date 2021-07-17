const { Contact } = require('../../model')

const add = async (req, res, next) => {
  const { body } = req
  try {
    const result = await Contact.create(body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result
      }
    })
  // eslint-disable-next-line brace-style
  }
  catch (error) {
    if (error.code === 1100) {
      error.code = 400
    }
    next(error)
  }
}

// eslint-disable-next-line eol-last
module.exports = add