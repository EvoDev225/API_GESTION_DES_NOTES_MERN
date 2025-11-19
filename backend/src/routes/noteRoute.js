const express = require('express')
const {touteNote,etudiantNote,insererNote,majNote,suppNote, selection} = require('../controllers/noteController')
const router = express.Router()
router.get("/",touteNote)
router.get("/notes/:matricule",selection)
router.post("/etudiant",etudiantNote)
router.post("/",insererNote)
router.put("/:id",majNote)
router.delete("/:id",suppNote)

module.exports = router