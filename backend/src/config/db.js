const mongoose = require('mongoose')
const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("Base de donnée connectée !")
    } catch (error) {
        console.log("Erreur de connexion a la base de donnée !",error)
    }
}
module.exports = connectDB