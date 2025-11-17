const mongoose = require('mongoose')

const schemaAdmin = new mongoose.Schema({
    nom:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})
const Admin = mongoose.model("admin",schemaAdmin)
module.exports = Admin