const Contact = require('./contact')

module.exports = {
  Contact
}

// const fs = require('fs/promises')
// const path = require('path')
// const shortid = require('shortid')
// const contactsPath = path.join(__dirname, './contacts.json')

// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath)
//   const result = JSON.parse(data)
//   return result
// }

// const getContactById = async (contactId) => {
//   const contacts = await listContacts()
//   const selectContact = contacts.find(contact => String(contact.id) === String(contactId))
//   return selectContact
// }

// const removeContact = async (contactId) => {
//   const contacts = await listContacts()
//   const index = contacts.findIndex(contact => String(contact.id) === String(contactId))
//   if (index !== -1) {
//     const filteredContacts = contacts.splice(index, 1)
//     const str = JSON.stringify(contacts)
//     await fs.writeFile(contactsPath, str)
//     return filteredContacts
//   }
//   return contacts
// }

// const addContact = async (body) => {
//   const contacts = await listContacts()
//   const newContact = { id: shortid.generate(), ...body }
//   contacts.push(newContact)

//   const str = JSON.stringify(contacts)
//   await fs.writeFile(contactsPath, str)
//   return newContact
// }

// const updateContact = async (contactId, body) => {
//   const contacts = await listContacts()
//   const index = contacts.findIndex(contact => String(contact.id) === String(contactId))
//   if (index === -1) return
//   contacts[index] = { ...contacts[index], body }

//   const str = JSON.stringify(contacts)
//   console.log(object)
//   await fs.writeFile(contactsPath, str)
//   return contacts[index]
// }

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   // updateContact,
// }
