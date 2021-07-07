const express = require('express')
const router = express.Router()

const contacts = require('../../model/contacts.json')
const shortid = require('shortid')
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
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: selectContact
    },
  })
})

router.post('/', express.json(), async (req, res, next) => {
  // console.log(req.body)
  const { error } = contactSchema.validate(req.body)
  if (error) {
    res.status(404).json({
      status: error,
      code: 400,
      message: 'missing required name field'
    })
    return
  }
  const newContact = await { ...req.body, id: shortid.generate() }
  contacts.push(newContact)
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result: newContact
    }
  })
  // res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const index = contacts.findIndex(contact => contact.id === parseInt(contactId))
  if (index === -1) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found'
    })
    return
  }
  await contacts.splice(index, 1)
  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'contact deleted',
  })
  // res.json({ message: 'template message' })
})

router.put('/:contactId', express.json(), async (req, res, next) => {
  const { error } = contactSchema.validate(req.body)
  if (error) {
    res.status(404).json({
      status: error,
      code: 400,
      message: 'missing fields'
    })
    return
  }
  const { contactId } = req.params
  const index = contacts.findIndex(contact => contact.id === parseInt(contactId))
  if (index === -1) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found'
    })
    return
  }
  contacts[index] = await { ...req.body, id: contactId }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts[index]
    },
  })
  // res.json({ message: 'template message' })
})

module.exports = router
