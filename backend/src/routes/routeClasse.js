const express = require ('express')
const router = express.Router()
const {touteClasse,nouvelClasse} = require('../controllers/classeController')

router.get("/",touteClasse)
router.post("/",nouvelClasse)

module.exports = router