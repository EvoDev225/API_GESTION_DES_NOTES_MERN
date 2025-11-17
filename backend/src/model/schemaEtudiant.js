const mongoose = require('mongoose')

const schemaEtudiant = new mongoose.Schema(
    {
        matricule:{
            type:String,
            required:true
        },
    nom:{
        type:String,
        required:true
    },
    prenom:{
        type:String,
        required:true
    },
    datenaiss:{
        type:Date,
        required:true
    },
    sexe:{
        type:String,
        required:true
    },
    matClasse:{
        type: mongoose.Schema.Types.ObjectId, // Stocke l'ObjectId
        ref: 'classe',
        required: true
    },

},{timestamps:true})

const Etudiant = mongoose.model("etudiant",schemaEtudiant)
module.exports = Etudiant