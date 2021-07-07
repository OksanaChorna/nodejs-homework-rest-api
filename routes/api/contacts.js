const express = require('express')
const router = express.Router()

// const contacts = require('../../model/contacts.json')
const contactSchema = require('./validate')
const ctrl = require('../../model/index')

router.get('/', async (req, res, next) => {
  const contacts = await ctrl.listContacts()
  return res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts
    },
  })
})

router.get('/:contactId', async (req, res, next) => {
  const selectContact = await ctrl.getContactById(req.params.contactId)
  if (!selectContact) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found'
    })
    return
  }
  return res.json({
    status: 'success',
    code: 200,
    data: {
      result: selectContact
    },
  })
})

router.post('/', express.json(), async (req, res, next) => {
  const { error } = contactSchema.validate(req.body)
  if (error) {
    res.status(404).json({
      status: error,
      code: 400,
      message: 'missing required name field'
    })
    return
  }
  const newContact = await ctrl.addContact(req.body)
  return res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result: newContact
    }
  })
})

router.delete('/:contactId', async (req, res, next) => {
  // const { contactId } = req.params
  const delContact = await ctrl.removeContact(req.params.contactId)
  if (delContact === -1) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found'
    })
  }
  return res.status(200).json({
    status: 'success',
    code: 200,
    message: 'contact deleted',
  })
})

// router.put('/:contactId', express.json(), async (req, res, next) => {
//   const { error } = contactSchema.validate(req.body)
//   if (error) {
//     res.status(404).json({
//       status: error,
//       code: 400,
//       message: 'missing fields'
//     })
//     return
//   }
//   const { contactId } = req.params
//   const index = contacts.findIndex(contact => contact.id === parseInt(contactId))
//   if (index === -1) {
//     res.status(404).json({
//       status: 'error',
//       code: 404,
//       message: 'Not found'
//     })
//     return
//   }
//   contacts[index] = await { ...req.body, id: contactId }
//   res.json({
//     status: 'success',
//     code: 200,
//     data: {
//       result: contacts[index]
//     },
//   })
// })

module.exports = router
