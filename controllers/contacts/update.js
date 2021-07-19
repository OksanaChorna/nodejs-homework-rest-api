// const { schemaUpdate } = require('../../routes/api/validate')
const { contact: service } = require("../../services");
const { schemaUpdate} = require('../../routes/api/validate')

const update = async (req, res, next) => {
    const { error } = schemaUpdate.validate(req.body)
    if (error) {
    res.status(404).json({
      status: error,
      code: 400,
      message: 'missing required name field'
    })
    return
  }
    const { body } = req
    const { id } = req.params
    try {
        const result = await service.update(id, body)
        res.json({
            status: "success",
            code: 200,
            data: {
                result
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = update
