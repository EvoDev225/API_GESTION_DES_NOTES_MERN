// Récupération du schéma
const Etudiant = require('../model/schemaEtudiant')
const Note = require('../model/schemaNote')

// Sélection de tous les étudiants
const toutEtudiant = async (req, res) => {
    try {
        const totalEtudiant = await Etudiant.find()
        if (totalEtudiant.length > 0) {
            return res.status(200).json({Status:"Success", message: "Etudiants trouvés!", data: totalEtudiant })
        }
        return res.status(404).json({message: "Aucun étudiant n'a été trouvé !"})
    } catch (error) {
        return res.status(500).json({ message: "Une erreur est survenu !" })
    }
}
// Sélection d'un étudiant par son identifiant
const specifiqEtudiant = async (req, res) => {
    const id = req.params.id
    try {
        const etudiant = await Etudiant.findById(id)
        if (!etudiant) {
            return res.status(400).json({ message: "Aucun étudiant n'a été trouvé !" })
        }
        return res.status(200).json({ message: "Etudiant identifié !", data: etudiant })
    } catch (error) {
        return res.status(400).json({ message: "Une erreur est survenue lors de l'obtention des informations de l'étudiant !", error: error.message })
    }
}
// Connection d'un étudiant
const connectEtudiant = async (req,res)=>{
    const {matricule} = req.body
try {
    if(!matricule){
        return res.status(404).json({message:"Le champ est requis !"})
    }
    const etud = await Etudiant.findOne({matricule:matricule})
    if(!etud){
        return res.status(404).json({message:"Le matricule est incorrecte"})
    }
    return res.status(201).json({Status:"Success",message:"Etudiant connecté !"})
} catch (error) {
    return res.status(500).json({message:"Une erreur est survenue lors de la connexion de l'étudiant !"})
}
}

//Création d'un nouvel étudiant
const nouvelEtudiant = async (req, res) => {
    try {
        const {matricule, nom, prenom, datenaiss, sexe, matClasse } = req.body
        if (!matricule|| !nom || !prenom || !datenaiss || !sexe || !matClasse) {
            return res.status(400).json({ message: "Tous les champs sont requis !" })
        }
        const nouveau = new Etudiant({ matricule,nom, prenom, datenaiss, sexe, matClasse })
        const ajoutEtudiant = await nouveau.save()
        res.status(201).json({ message: "Etudiant enregistré avec succès !", data: ajoutEtudiant })
    } catch (error) {
        return res.status(500).json({ message: "une erreur est survenue lors de l'enregistrement !", error: error })
    }


}
// Mise à jour des données d'un étudiants
const majEtudiant = async (req, res) => {
    const id = req.params.id
    const { matricule, nom, prenom, datenaiss, sexe, matClasse } = req.body
    try {
        const majetudiant = await Etudiant.findByIdAndDelete(id, {matricule, nom, prenom, datenaiss, sexe, matClasse }, { new: true })
        if (!majEtudiant) {
            return res.status(404).json({message: "l'identifiant ne correspond a aucun étudiant"})
        }
            return res.status(200).json({Status:"Success", message: "les données de l'étudiant ont été mise à jour !", data: majetudiant })
    } catch (error) {
        return res.status(400).json({ message: "Une erreur est survenue lors de l'obtention des informations de l'étudiant !", error: error.message })
    }

}

//Suppression d'un étudiant
const suppEtudiant = async (req, res) => {
    const id = req.params.id
     try {
        console.log('🔍 ID reçu pour suppression:', id)
        
        // 1. Trouver l'étudiant par son ID
        const etudiant = await Etudiant.findById(id)
        console.log('🔍 Étudiant trouvé:', etudiant)
        
        if(!etudiant){
            return res.status(404).json({message: "Aucun étudiant trouvé avec cet ID !"})
        }
        
        // 2. Récupérer le matricule de l'étudiant trouvé
        const matriculeEtudiant = etudiant.matricule
        console.log('🔍 Matricule à supprimer:', matriculeEtudiant)
        
        // 3. Supprimer toutes les notes de cet étudiant
        await Note.deleteMany({matetud: matriculeEtudiant})
        console.log('✅ Notes supprimées')
        
        // 4. Supprimer l'étudiant
        const supprimerEtudiant = await Etudiant.findByIdAndDelete(id)
        console.log('✅ Étudiant supprimé')
        
        return res.status(200).json({Status:"Success",  message: "L'étudiant et ses notes ont bien été supprimés !"})
    } catch (error) {
        return res.status(400).json({ message: "Une erreur est survenue lors de la suppression des informations de l'étudiant !", error: error.message })
    }
}
module.exports = { toutEtudiant, specifiqEtudiant, nouvelEtudiant, majEtudiant, suppEtudiant,connectEtudiant }