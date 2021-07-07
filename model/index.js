const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  const result = JSON.parse(data)
  console.log(result)
  return result
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const selectContact = contacts.find(contact => contact.id === parseInt(contactId))
  return selectContact
}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
