// Récupération du schéma
const Etudiant = require('../model/schemaEtudiant')
// Sélection de tous les étudiants
const toutEtudiant = async (req, res) => {
    try {
        const totalEtudiant = await Etudiant.find()
        if (totalEtudiant.length > 0) {
            res.status(200).json({ message: "Etudiants trouvés!", data: totalEtudiant })
        }
    } catch (error) {
        return res.status(400).json({ message: "Aucun étudiant n'a été trouvé !" })
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
            return res.status(200).json({ message: "les données de l'étudiant ont été mise à jour !", data: majetudiant })
    } catch (error) {
        return res.status(400).json({ message: "Une erreur est survenue lors de l'obtention des informations de l'étudiant !", error: error.message })
    }

}

//Suppression d'un étudiant
const suppEtudiant = async (req, res) => {
    const id = req.params.id
    try {
        const supprimerEtudiant = await Etudiant.findByIdAndDelete(id)
        if(!supprimerEtudiant){
            return res.status(404).json({message: "l'identifiant ne correspond a aucun étudiant"})
        }
        return res.status(200).json({ message: "L'étudiant a bien été supprimé!" })
    } catch (error) {
        return res.status(400).json({ message: "Une erreur est survenue lors de la suppression des informations de l'étudiant !", error: error.message })
    }
}
module.exports = { toutEtudiant, specifiqEtudiant, nouvelEtudiant, majEtudiant, suppEtudiant }