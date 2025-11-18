const Classe = require('../model/schemaclasse')
const Etudiant = require('../model/schemaEtudiant')
// Récupération de toutes les classe
const touteClasse = async (req, res) => {
    try {
        const classe = await Classe.find()
        if(!classe){
            return res.status(404).json({message:"Aucune classe trouvéz !"})
        }
        return res.status(200).json({
            Status: "Success",
            message: "Liste des classes ",
            data: classe
        });

    } catch (error) {
        return res.status(500).json({
            Status: "Error",
            message: "Erreur lors de la récupération"
        });
    }
};

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
const nomEtudiant =async(req,res)=>{
    const {id} = req.params
    try {
        if(!id){
            return res.status(404).json({message:"L'ID est invalide !"})
        }
        const listeEtudiant = await Etudiant.find({matClasse:id})
        if(listeEtudiant.length===0){
            return res.status(400).json({message:"Aucun étudiant dans cette classe"})
        }
        return res.status(200).json({Status:"Success",message:"Les étudiants sont affichés !",data:listeEtudiant})
    } catch (error) {
        return res.status(500).json({message:"Une erreur est survenu !",error:error.message})
    }
}


module.exports = {touteClasse,nouvelClasse,nomEtudiant}