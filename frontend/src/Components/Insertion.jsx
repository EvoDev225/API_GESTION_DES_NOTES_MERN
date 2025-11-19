import { useEffect } from "react"
import NavBar from "./NavBar"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"


const Insertion = () => {
    const [classe, setclasse] = useState([])
    const [etudiant, setEtudiant] = useState({
        matricule: "",
        nom: "",
        prenom: "",
        datenaiss: "",
        sexe: "",
        matClasse: ""
    })

    useEffect(() => {
        const fetchMatricule = async () => {
            try {
                const response = await axios.get("http://localhost:3000/etudiant/generateur")
                if (response.data.Status === "Success") {
                    setEtudiant(prev => ({
                        ...prev,
                        matricule: response.data.matricule
                    }))
                }
            } catch (error) {
                toast.error("Erreur lors de la génération du matricule")
            }
        }
       

        const fetchClasse = async () => {
            try {
                const classes = await axios.get("http://localhost:3000/classe")
                if (classes.data.Status === "Success") {
                    setclasse(classes.data.data)
                }
            } catch (error) {
                toast.error(error.response?.data?.error)
            }
        }

        fetchClasse()
        fetchMatricule()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setEtudiant(prev => ({
            ...prev,
            [name]: value
        }))
    }
     const ajouterEtudiant = async(e)=>{
            e.preventDefault()
            try {
                const nouvelEtudiant = await axios.post("http://localhost:3000/etudiant",etudiant)
                if(nouvelEtudiant.data.Status==="Success"){
                    toast.success(nouvelEtudiant.data.message)
                    setEtudiant({
                matricule: "", // Garder matricule vide pour regénérer
                nom: "",
                prenom: "",
                datenaiss: "",
                sexe: "",
                matClasse: ""
            })
                }
            } catch (error) {
                toast.error("Erreur lors de l'insertion de l'étudiant !")
                
            }
        }


    return (
        <div className='w-full flex items-center  min-h-screen'>
            <NavBar />
            <div className="pl-[200px] w-full">
                <div className='  w-7xl mx-auto border-t-5  border-gray-500   px-20 py-10 rounded-3xl shadow-2xl'>
                    <div className=" my-10">
                        <h1 className="text-5xl font-bold uppercase">Ajouter un nouvel étudiant</h1>
                    </div>
                    <div className=" px-20">
                        <div className="flex items-center gap-10 my-12">
                            <h1 className="text-3xl font-bold">Classe</h1>
                            <select 
                                name="matClasse" 
                                value={etudiant.matClasse}
                                className="px-5 py-2 text-2xl text-gray-500 border rounded-xl" 
                                onChange={e=>setEtudiant({...etudiant,matClasse:e.target.value})}
                            >
                                <option value="">Sélectionner</option>
                                {
                                    classe.map((classes) => (
                                        <option key={classes._id} value={classes._id}> {classes.nom} </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="w-full ">
                            <form action="" className="" onSubmit={ajouterEtudiant}>
                                <div className="flex flex-col gap-2  w-100">
                                    <h1 className="text-3xl font-bold">Matricule</h1>
                                    <input 
                                        name="matricule"
                                        type="text" 
                                        value={etudiant.matricule} 
                                        readOnly 
                                        className="px-5 py-2 border-2 border-gray-500 outline-none shadow-2xl  rounded-xl " 
                                    />
                                </div>
                                <div className="w-full flex gap-2 my-10 ">
                                    <div className="flex flex-col w-1/2 ">
                                        <h1 className="text-3xl font-bold">Nom</h1>
                                        <input 
                                            name="nom"
                                            value={etudiant.nom}
                                            onChange={handleChange} 
                                            type="text" 
                                            className="px-5 py-2 border-2 border-gray-500 outline-none shadow-2xl  rounded-xl" 
                                        />
                                    </div>
                                    <div className="flex flex-col w-1/2">
                                        <h1 className="text-3xl font-bold">Prénom</h1>
                                        <input 
                                            name="prenom"
                                            value={etudiant.prenom}
                                            onChange={handleChange} 
                                            type="text" 
                                            className="px-5 py-2 border-2 border-gray-500 outline-none shadow-2xl  rounded-xl" 
                                        />
                                    </div>
                                </div>
                                <div className="w-full flex items-center gap-2 my-10 ">
                                    <div className="flex flex-col w-1/2 ">
                                        <h1 className="text-3xl font-bold">Date de naissance</h1>
                                        <input 
                                            name="datenaiss"
                                            value={etudiant.datenaiss}
                                            onChange={handleChange} 
                                            type="date" 
                                            className="px-5 py-2 border-2 border-gray-500 outline-none shadow-2xl  rounded-xl" 
                                        />
                                    </div>
                                    <div className="flex flex-col r w-1/2 ">
                                        <h1 className="text-3xl font-bold ">Sexe</h1>
                                        <select 
                                            name="sexe" 
                                            value={etudiant.sexe}
                                            className="px-5 py-2 text-2xl border-2 text-gray-500 shadow-2xl rounded-xl " 
                                            onChange={handleChange}
                                        >
                                            <option value="">Sélectionner</option>
                                            <option value="Masculin">Masculin</option>
                                            <option value="Féminin">Féminin</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="p-10 w-full flex items-center justify-center">
                                    <button type="submit" className="font-medium text-3xl px-6 py-3 bg-base border-gray-600 border-3 duration-200 transition-all cursor-pointer hover:scale-90 text-gray-500 rounded-2xl">Enregistrer</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Insertion