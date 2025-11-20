const Etudiant = require('../model/schemaEtudiant')
const Note = require('../model/schemaNote')

// Récupération de toutes les notes
const touteNote = async (req,res)=>{
    try {
        const notes = await Note.find().sort({createdAt:-1})
        if(!notes){
            return res.status(404).json({message:"Aucune notes n'a été trouvé !"})
        }
        return res.status(200).json({Status:"Success",message:"Les notes ont été récupéré !",data:notes})
    } catch (error) {
        return res.status(500).json({message:"Une erreur est survenue lors de l'obtention des notes !",error:error.message})
    }
}
// Récupération des notes spécifiques a un étudiant
const etudiantNote = async (req,res)=>{
    const {matricule} = req.body
    try {
        // On vérifie si l'identifiant est correcte
        const notes = await Note.find({matetud:matricule})
        if(notes.length===0){
            return res.status(404).json({message:"Aucune notes n'a été trouvé correspondant a ce matricule !"})
        }
        return res.status(200).json({Status:"Success",message:"Les notes  de l'étudiant  ont été récupéré !",data:notes})
    } catch (error) {
        return res.status(500).json({message:"Une erreur est survenue lors de l'obtention des notes !",error:error.message})
    }
}
// Insertion des notes par étudiant
const insererNote = async (req,res)=>{ 
    const {matetud,francais,mathematique,anglais,svt,moyenneGenerale,Status} = req.body
    try {
        if(!matetud || !francais || !mathematique || ! anglais || ! svt || !moyenneGenerale || !Status  ){
            return res.status(404).json({message:"Tous les champs sont requis ! "})
        }
        const etudiant = await Etudiant.findOne({matricule:matetud})
        if(!etudiant){
            return res.status(404).json({message:"Aucun étudiant ne correspond a ce matricule"})
        }
        const nouveau = new Note( {matetud,francais,mathematique,anglais,svt,moyenneGenerale,Status})
        const ajouterNote = await nouveau.save()
        return res.status(201).json({Status:"Success",message:"Les notes ont bien été enregistrées",data:ajouterNote})
    } catch (error) {
        return res.status(500).json({message:"Une erreur est survenue lors de l'insertion des notes !",error:error.message})
}
}
// Mise a jour des notes
    const majNote = async (req,res)=>{
        const id = req.params.id
            const {matetud,francais,mathematique,anglais,svt,moyenneGenerale} = req.body
        try {
            const etudiant = await Etudiant.findOne({matricule:matetud})
            if(!etudiant){
                return res.status(404).json({message:"Aucun étudiant ne correspond a ce matricule"})
            }
            const majNotes = await Note.findByIdAndUpdate(id, {matetud,francais,mathematique,anglais,svt,moyenneGenerale})
            return res.status(200).json({Status:"Success",message:"Les notes ont été modifié avec succès !",data:majNotes})
        } catch (error) {
            return res.status(500).json({message:"Une erreur est survenue lors de la modification des notes !",error:error.message})
        }
    }
    // Suppression des notes
    const suppNote = async (req,res)=>{
        const id = req.params.id
        try {
            const supprimer = await Note.findByIdAndDelete(id)
            return res.status(200).json({message:"Les notes ont été supprimé avec succès !"})
        } catch (error) {
            return res.status(500).json({message:"Une erreur est survenue lors de la suppression des notes !",error:error.message})
            
        }
    }
    const selection = async(req,res)=>{
            const {matricule} = req.params
    try {
        // On vérifie si l'identifiant est correcte
        const notes = await Note.find({matetud:matricule})
        if(notes.length===0){
            return res.status(404).json({message:"Aucune notes n'a été trouvé correspondant a ce matricule !"})
        }
        return res.status(200).json({Status:"Success",message:"Les notes  de l'étudiant  ont été récupéré !",data:notes})
    } catch (error) {
        return res.status(500).json({message:"Une erreur est survenue lors de l'obtention des notes !",error:error.message})
    }
    }

    module.exports = {touteNote,etudiantNote,insererNote,majNote,suppNote,selection}



    // .exe