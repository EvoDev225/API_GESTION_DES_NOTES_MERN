const express = require('express')
const {touteNote,etudiantNote,insererNote,majNote,suppNote} = require('../controllers/noteController')
const router = express.Router()
router.get("/",touteNote)
router.post("/etudiant",etudiantNote)
router.post("/",insererNote)
router.put("/:id",majNote)
router.delete("/:id",suppNote)

module.exports = router