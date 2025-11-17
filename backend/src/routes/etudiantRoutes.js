const express = require('express')
const router = express.Router()
const {toutEtudiant,specifiqEtudiant,nouvelEtudiant,majEtudiant,suppEtudiant} = require('../controllers/StudentController')
router.get('/',toutEtudiant)
router.get('/:id',specifiqEtudiant)
router.post('/',nouvelEtudiant)
router.put('/:id',majEtudiant)
router.delete('/:id',suppEtudiant)
module.exports = router