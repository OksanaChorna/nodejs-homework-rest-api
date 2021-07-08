const contacts = require('../model/contacts.json')
const updateContacts = require('./updContacts')
const { schemaUpdate } = require('../routes/api/validate')

const updateContact = async (req, res) => {
  const { error } = schemaUpdate.validate(req.body)
  if (error) {
    res.status(404).json({
      status: error,
      code: 400,
      message: 'missing fields'
    })
    return
  }
  const { contactId } = req.params
  const index = contacts.findIndex(contact => String(contact.id) === String(contactId))
  console.log(index)
  if (index === -1) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found'
    })
    return
  }
  contacts[index] = { ...req.body, id: contactId }
  await res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts[index]
    }
  })
  updateContacts(contacts)
}

module.exports = updateContact
