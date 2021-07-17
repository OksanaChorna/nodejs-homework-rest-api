const express = require('express')
const router = express.Router()

const { contacts: ctrl } = require('../../controllers')
// const {createContactValidate, updateContactValidate, updateContactStatusValidate} = require('./validate')

router.get('/', ctrl.getAll)
router.get('/:id', ctrl.getById)
router.post('/', express.json(), ctrl.add)
router.put('/:id', express.json(), ctrl.update)
router.patch('/:id/favorite', express.json(), ctrl.updateStatusContact)
router.delete('/:id', express.json(), ctrl.remove)

module.exports = router
