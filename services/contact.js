const { Contact } = require('../model')

const getAll = () => {
    return Contact.find({})
}

const getById = async (id) => {
    try {
        const result = await Contact.findById(id)
        return result
    }
    catch (error) {
        if (error.message.includes("Cast to ObjectId failed")){
            return null
        }
        throw error
    }
}

module.exports = { getAll, getById }