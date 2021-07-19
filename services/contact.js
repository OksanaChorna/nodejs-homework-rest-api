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

const add = (newContact) => {
    return Contact.create(newContact)
}

const update = async (id, updateContact) => {
    try {
        const result = await Contact.findByIdAndUpdate(id, updateContact, { new: true })
        return result
    }
    catch (error) {
        if (error.message.includes("Cast to ObjectId failed")){
            return null
        }
        throw error
    }
}

const updateStatusContact = async (id, favorite) => {
    try {
        const result = await Contact.findByIdAndUpdate(id, favorite, { new: true })
        return result
    }
    catch (error) {
        if (error.message.includes("Cast to ObjectId failed")){
            return null
        }
        throw error
    }
}

const remove = async (id) => {
    try {
        const result = await Contact.findByIdAndDelete(id)
        return result
    }
    catch (error) {
        if (error.message.includes("Cast to ObjectId failed")){
            return null
        }
        throw error
    }
}

module.exports = {
    add,getAll, getById, update, updateStatusContact, remove
}