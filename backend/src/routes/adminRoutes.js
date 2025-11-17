const express = require('express')
const router = express.Router()
const {identificationAdmin,insererAdmin} = require('../controllers/adminController')

router.post('/admin',identificationAdmin)
router.post('/',insererAdmin)

module.exports =router