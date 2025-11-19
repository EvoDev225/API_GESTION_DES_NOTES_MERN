import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import NavBar from "./Components/NavBar"
import { useParams } from "react-router"

const MajEtudiant = () => {
    const { matricule } = useParams()

    const [etudiant, setEtudiant] = useState({
        matricule: "",
        nom: "",
        prenom: "",
        datenaiss: "",
        sexe: "",
        matClasse: "",
        _id: ""
    })

    // Charger les données de l'étudiant
    useEffect(() => {
        const fetchEtudiant = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/etudiant/${matricule}`)
                if (res.data.Status === "Success") {
                    setEtudiant(res.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchEtudiant()
    }, [matricule])

    // Mise à jour
    const miseajour = async (e) => {
        e.preventDefault()
        try {
            const maj = await axios.put(`http://localhost:3000/etudiant/${etudiant._id}`, etudiant)

            if (maj.data.Status === "Success") {
                toast.success("Étudiant mis à jour avec succès")
            }
        } catch (error) {
            console.log(error)
            toast.error("Erreur lors de la mise à jour")
        }
    }

    // Fonction utilitaire pour changer les champs
    const handleChange = (e) => {
        setEtudiant({
            ...etudiant,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className='w-full flex items-center min-h-screen'>
            <NavBar />
            <div className="pl-[200px] w-full">
                <div className='w-7xl mx-auto border-t-5 border-gray-500 px-20 py-10 rounded-3xl shadow-2xl'>
                    <div className="my-10">
                        <h1 className="text-5xl font-bold uppercase">Mettre à jour un étudiant</h1>
                    </div>

                    <div className="px-20">
                        <form onSubmit={miseajour}>
                            
                            {/* Classe */}
                            <div className="flex items-center gap-10 my-12">
                                <h1 className="text-3xl font-bold">Classe</h1>
                                <input 
                                    type="text"
                                    value={etudiant.matClasse}
                                    readOnly
                                    className="px-5 py-2 text-2xl text-gray-500 border rounded-xl"
                                />
                            </div>

                            {/* Matricule */}
                            <div className="flex flex-col gap-2 w-100">
                                <h1 className="text-3xl font-bold">Matricule</h1>
                                <input 
                                    name="matricule"
                                    type="text"
                                    value={etudiant.matricule}
                                    readOnly
                                    className="px-5 py-2 border-2 border-gray-500 outline-none shadow-2xl rounded-xl"
                                />
                            </div>

                            {/* Nom & Prénom */}
                            <div className="w-full flex gap-2 my-10">
                                <div className="flex flex-col w-1/2">
                                    <h1 className="text-3xl font-bold">Nom</h1>
                                    <input
                                        name="nom"
                                        type="text"
                                        value={etudiant.nom}
                                        onChange={handleChange}
                                        className="px-5 py-2 border-2 border-gray-500 outline-none shadow-2xl rounded-xl"
                                    />
                                </div>

                                <div className="flex flex-col w-1/2">
                                    <h1 className="text-3xl font-bold">Prénom</h1>
                                    <input
                                        name="prenom"
                                        type="text"
                                        value={etudiant.prenom}
                                        onChange={handleChange}
                                        className="px-5 py-2 border-2 border-gray-500 outline-none shadow-2xl rounded-xl"
                                    />
                                </div>
                            </div>

                            {/* Date + Sexe */}
                            <div className="w-full flex items-center gap-2 my-10">
                                <div className="flex flex-col w-1/2">
                                    <h1 className="text-3xl font-bold">Date de naissance</h1>
                                    <input
                                        name="datenaiss"
                                        type="date"
                                        value={etudiant.datenaiss?.substring(0, 10)}
                                        onChange={handleChange}
                                        className="px-5 py-2 border-2 border-gray-500 outline-none shadow-2xl rounded-xl"
                                    />
                                </div>

                                <div className="flex flex-col w-1/2">
                                    <h1 className="text-3xl font-bold">Sexe</h1>
                                    <select
                                        name="sexe"
                                        value={etudiant.sexe}
                                        onChange={handleChange}
                                        className="px-5 py-2 text-2xl border-2 text-gray-500 shadow-2xl rounded-xl"
                                    >
                                        <option value="">Sélectionner</option>
                                        <option value="Masculin">Masculin</option>
                                        <option value="Féminin">Féminin</option>
                                    </select>
                                </div>
                            </div>

                            <div className="p-10 w-full flex items-center justify-center">
                                <button 
                                    type="submit" 
                                    className="font-medium text-3xl px-6 py-3 bg-base border-gray-600 border-3 duration-200 transition-all cursor-pointer hover:scale-90 text-gray-500 rounded-2xl"
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MajEtudiant
