const express = require('express')
const router = express.Router()

const { contacts: ctrl } = require('../../controllers')

// const { contactSchema } = require('./validate')
// const ctrl = require('../../model/index')
// const updateContact = require('../../controllers/update')

router.get('/', ctrl.getAll)
router.get('/:id', ctrl.getById)
router.post('/', express.json(), ctrl.add)
router.put('/:id', express.json(), ctrl.update)
router.delete('/:id', express.json(), ctrl.remove)

// router.get('/:contactId', async (req, res, next) => {
//   const selectContact = await ctrl.getContactById(req.params.contactId)
//   if (!selectContact) {
//     res.status(404).json({
//       status: 'error',
//       code: 404,
//       message: 'Not found'
//     })
//     return
//   }
//   return res.json({
//     status: 'success',
//     code: 200,
//     data: {
//       result: selectContact
//     },
//   })
// })

// router.post('/', express.json(), async (req, res, next) => {
//   const { error } = contactSchema.validate(req.body)
//   if (error) {
//     res.status(404).json({
//       status: error,
//       code: 400,
//       message: 'missing required name field'
//     })
//     return
//   }
//   const newContact = await ctrl.addContact(req.body)
//   return res.status(201).json({
//     status: 'success',
//     code: 201,
//     data: {
//       result: newContact
//     }
//   })
// })

// router.delete('/:contactId', async (req, res, next) => {
//   const delContact = await ctrl.removeContact(req.params.contactId)
//   if (delContact === -1) {
//     return res.status(404).json({
//       status: 'error',
//       code: 404,
//       message: 'Not found'
//     })
//   }
//   return res.status(200).json({
//     status: 'success',
//     code: 200,
//     message: 'contact deleted',
//   })
// })

// // router.put('/:contactId', express.json(), async (req, res, next) => {
// //   const { error } = schemaUpdate.validate(req.body)
// //   if (error) {
// //     res.status(404).json({
// //       status: error,
// //       code: 400,
// //       message: 'missing fields'
// //     })
// //     return
// //   }

// //   const index = await ctrl.updateContact(req.params.contactId, req.params.body)
// //   if (index) {
// //     return res.status(200).json({
// //       status: 'success',
// //       code: 200,
// //       data: { index },
// //     })
// //   }
// //   return res.status(404).json({
// //     status: 'error',
// //     code: 404,
// //     message: 'Not found'
// //   })
// // })

// router.put('/:contactId', express.json(), updateContact)

module.exports = router
