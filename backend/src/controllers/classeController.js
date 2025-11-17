const Classe = require('../model/schemaclasse')
// Récupération de toutes les classe
const touteClasse= async (req,res)=>{
    try {
        const totalClasse = await Classe.find()
        if (totalClasse.length > 0) {
            res.status(200).json({ message: "Etudiants troués!", data: totalClasse })
        }
        return res.status(200).json({ message: "La liste des classe est vide !", data: totalClasse.length })
    } catch (error) {
        return res.status(400).json({message:"Aucune classe n'a été trouve !"})
    }
}
//Création de nouvelle classe
const nouvelClasse = async (req, res) => {
        const { nom, libelle, order } = req.body
    try {
        // Validation des champs
         if (!nom || !libelle || !order) {
            return res.status(400).json({ message: "Veuillez remplir tous les champs !" })
        }
        // Debug: afficher le body reçu
        console.log("Body reçu:", req.body)
        
        // Création et sauvegarde
        const nouvel = new Classe({ nom, libelle, order })
        const ajoutClasse = await nouvel.save()
        
        // Réponse de succès
        return res.status(201).json({ message: "La classe a été enregistrée avec succès !", data: ajoutClasse 
        })
        
    } catch (error) {
        console.error("Erreur détaillée:", error)
        return res.status(500).json({ message: "Une erreur est survenue lors de l'enregistrement de la classe !", error:error.message})}
}


module.exports = {touteClasse,nouvelClasse}