const mongoose = require('mongoose')
const schemaClasse = new mongoose.Schema(
    {
    nom:{
        type:String,
        required:true
    },
    libelle:{
        type:String,
        required:true
    },
    order:{
        type:Number,
        required:true
    },

},{timestamps:true})

const Classe = mongoose.model("classe",schemaClasse)
module.exports = Classe