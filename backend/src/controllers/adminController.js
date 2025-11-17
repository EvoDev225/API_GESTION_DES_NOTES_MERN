const Admin = require('../model/schemaAdmin')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const identificationAdmin = async(req,res)=>{
    const {nom,password} = req.body
    try {
        const admin = await Admin.findOne({nom})
        if(admin && bcrypt.compare(password,admin.password)){
            return res.status(200).json({message:"Administrateur connecté !",data:admin})
        }
        return res.status(404).json({message:"Les informations sont incorrectes !"})
    } catch (error) {
        return res.status(500).json({message:"Une erreur est survenue lors de la requête sur l'administrateur !",error:error.message})
    }
}

const insererAdmin = async(req,res)=>{
    const {nom,password} = req.body
    if(!nom || !password){
        return res.status(400).json({message:"Tous les champs sont requis"})
    }
    try {
        const hashPwd = await bcrypt.hash(password,10)
        const nouveau = new Admin({nom,password:hashPwd})
        let token = jwt.sign({nom},process.env.SECRET_KEY)
        const ajouterAdmin = await nouveau.save()
        return res.status(200).json({message:"L'administrateur a été enregistré !",data:ajouterAdmin,tokens:token})
    } catch (error) {
        return res.status(500).json({message:"Une erreur est survenue !",error:error.message})
    }
}

module.exports = {identificationAdmin,insererAdmin}