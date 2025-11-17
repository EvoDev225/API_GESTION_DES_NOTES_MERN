const mongoose = require('mongoose')

const schemaNote =new  mongoose.Schema(
{
    matetud:{
        type: String, // Stocke l'ObjectId
        ref: 'etudiants',
        required: true,
        unique:true
    },
  francais: [{ type: Number,required:true }],        // [ds, examen, moyenne]
    mathematique: [{ type: Number,required:true }],    // [ds, examen, moyenne]
    anglais: [{ type: Number,required:true }],         // [ds, examen, moyenne]
    svt: [{ type: Number,required:true }],             // [ds, examen, moyenne]
    moyenneGenerale: {
        type: Number,
        required:true
    }
},{timestamps:true})

const Note = mongoose.model("note",schemaNote)
module.exports = Note