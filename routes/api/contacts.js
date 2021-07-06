const express = require('express')
const router = express.Router()

const contacts = require('../../model/contacts.json')
const shortid = require('shortid')

router.get('/', async (req, res, next) => {
  console.log(req.query)
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts
    },
  })
  // res.json({ message: 'Not found' })
})

router.get('/:contactId', async (req, res, next) => {
  // console.log(req.params)
  const { contactId } = req.params
  const selectContact = contacts.find(contact => {
    // console.log(contact, contactId)
    return contact.id === parseInt(contactId)
  })
  if (!selectContact) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Contact with this id not found'
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
  // res.json({ message: 'template message' })
})

router.post('/', express.json(), async (req, res, next) => {
  console.log(req.body)
  const newContact = { ...req.body, id: shortid.generate() }
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
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
