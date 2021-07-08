const fs = require('fs').promises
const path = require('path')
const contactsPath = path.join(__dirname, './contacts.json')

const updateContacts = async (contacts) => {
  const str = JSON.stringify(contacts)
  // eslint-disable-next-line no-useless-catch
  await fs.writeFile(contactsPath, str)
}

// eslint-disable-next-line eol-last
module.exports = updateContacts