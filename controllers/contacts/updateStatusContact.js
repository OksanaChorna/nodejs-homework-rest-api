const { contact: service } = require("../../services");
const { schemaUpdateStatusContact} = require('../../routes/api/validate')

const updateStatusContact = async (req, res, next) => {
    const { error } = schemaUpdateStatusContact.validate(req.body)
    if (error) {
    res.status(404).json({
      status: error,
      code: 400,
      message: 'missing required name field'
    })
    return
  }
    const { id } = req.params
    const { favorite = false } = req.body
    try {
        const result = await service.updateStatusContact(id, {favorite})
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

module.exports = updateStatusContact