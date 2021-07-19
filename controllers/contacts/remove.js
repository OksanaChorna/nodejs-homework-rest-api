const { contact: service } = require('../../services')

const remove = async (req, res, next) => {
    const { id } = req.params
  try {
    const result = await service.remove(id);
        res.json({
            status: 'success',
            code: 200,
            data: {
                result
            }
        })
    }
  catch (error) {
    next(error);
    }
}

module.exports = remove