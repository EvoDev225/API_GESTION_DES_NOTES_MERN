const express = require ('express')
const router = express.Router()
const {touteClasse,nouvelClasse,nomEtudiant} = require('../controllers/classeController')

router.get("/",touteClasse)
router.get("/etudiant/:id",nomEtudiant)
router.post("/",nouvelClasse)

module.exports = router