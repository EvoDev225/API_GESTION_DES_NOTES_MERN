import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaRegChartBar } from "react-icons/fa";
import toast from "react-hot-toast";
const Dashboard = () => {
    const [etudiant, setEtudiant] = useState([]);
    const [notes, setNotes] = useState([]);
    const [classe, setClasse] = useState([]);
    const [liste, setListe] = useState([]);
    const [selectedEtudiant, setSelectedEtudiant] = useState("");
    const [pourcentageReussite, setPourcentageReussite] = useState(0);
    const [selectedClasseId, setSelectedClasseId] = useState("");
 
    useEffect(() => {
        const fetchEtudiant = async () => {
            try {
                const etudiant = await axios.get("http://localhost:3000/etudiant");
                if (etudiant.data.Status === "Success") {
                    setEtudiant(etudiant.data.data);
                }
            } catch (error) {
                toast.error(error.response.etudiant.message);
            }
        };

        const fetchClasse = async () => {
            try {
                const classes = await axios.get("http://localhost:3000/classe");
                if (classes.data.Status === "Success") {
                    setClasse(classes.data.data);
                    setListe([]);
                }
            } catch (error) {
                toast.error("Erreur lors du chargement des classes");
            }
        };
        fetchEtudiant();
        fetchClasse();
    }, []);

    const calculerPourcentageReussite = async (classeId) => {
        if (!classeId) {
            setPourcentageReussite(0);
            return;
        }

        try {
            // Récupérer tous les étudiants de la classe
            const etudiantsClasse = await axios.get(`http://localhost:3000/classe/etudiant/${classeId}`);
            
            if (etudiantsClasse.data.Status === "Success" && etudiantsClasse.data.data.length > 0) {
                let totalAdmis = 0;
                let totalEtudiants = 0;

                // Pour chaque étudiant, récupérer ses notes et vérifier s'il est admis
                for (const etudiant of etudiantsClasse.data.data) {
                    try {
                        const notesResponse = await axios.post("http://localhost:3000/note/etudiant", {
                            matricule: etudiant.matricule,
                        });
                        
                        if (notesResponse.data.Status === "Success" && notesResponse.data.data.length > 0) {
                            const notesEtudiant = notesResponse.data.data[0]; // Prendre le premier élément du tableau
                            if (notesEtudiant.moyenneGenerale > 10) {
                                totalAdmis++;
                            }
                            totalEtudiants++;
                        }
                    } catch (error) {
                        console.log(`Erreur lors du chargement des notes pour ${etudiant.matricule}`);
                    }
                }

                // Calculer le pourcentage
                const pourcentage = totalEtudiants > 0 ? Math.round((totalAdmis / totalEtudiants) * 100) : 0;
                setPourcentageReussite(pourcentage);
            } else {
                setPourcentageReussite(0);
            }
        } catch (error) {
            console.error("Erreur lors du calcul du pourcentage de réussite:", error);
            setPourcentageReussite(0);
        }
    };

    const afficherNom = async (id) => {
        if (!id) {
            setListe([]);
            setSelectedEtudiant("");
            setNotes([]);
            setPourcentageReussite(0);
            setSelectedClasseId("");
            return;
        }

        try {
            const nomEtudiant = await axios.get(
                `http://localhost:3000/classe/etudiant/${id}`
            );
            if (nomEtudiant.data.Status === "Success") {
                setListe(nomEtudiant.data.data);
                setSelectedEtudiant("");
                setNotes([]);
                setSelectedClasseId(id);
                
                // Calculer le pourcentage de réussite pour cette classe
                calculerPourcentageReussite(id);
            }
        } catch (error) {
            setListe([]);
            setNotes([]);
            setPourcentageReussite(0);
        }
    };

    const fetchNotes = async (matricule) => {
        if (!matricule) {
            setNotes([]);
            setSelectedEtudiant("");
            return;
        }

        try {
            const notes = await axios.post("http://localhost:3000/note/etudiant", {
                matricule: matricule,
            });
            if (notes.data.Status === "Success") {
                setNotes(notes.data.data);
                setSelectedEtudiant(matricule);
                toast.success("Notes chargées avec succès");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Erreur lors du chargement des notes"
            );
            setNotes([]);
        }
    };

    const handleEtudiantChange = (matricule) => {
        fetchNotes(matricule);
    };

    // Fonction pour calculer la moyenne d'une matière
    const calculerMoyenneMatiere = (notesMatiere) => {
        if (!notesMatiere || notesMatiere.length === 0) return 0;
        const somme = notesMatiere.reduce((acc, note) => acc + note, 0);
        return (somme / notesMatiere.length).toFixed(2);
    };

    // Fonction pour calculer la moyenne générale
    const calculerMoyenneGenerale = (allNotes) => {
        if (!allNotes || Object.keys(allNotes).length === 0) return 0;

        let totalNotes = 0;
        let totalMatieres = 0;

        Object.values(allNotes).forEach((notesMatiere) => {
            if (notesMatiere && notesMatiere.length > 0) {
                const moyenneMatiere = calculerMoyenneMatiere(notesMatiere);
                totalNotes += parseFloat(moyenneMatiere);
                totalMatieres++;
            }
        });

        return totalMatieres > 0 ? (totalNotes / totalMatieres).toFixed(2) : 0;
    };

    const supprimerEtudiant = async (id) => {
        try {
            const supp = await axios.delete(`http://localhost:3000/etudiant/${id}`)
            console.log(id)
            if (supp.data.Status === "Success") {
                toast.success(supp.data.message)
                setListe([])
                setEtudiant([])
                setNotes([])
                // Recalculer le pourcentage après suppression
                if (selectedClasseId) {
                    calculerPourcentageReussite(selectedClasseId);
                }
            }
        } catch (error) {
            toast.error(error.response)
        }
    }

    return (
        <div className="min-h-screen flex relative">
            <NavBar />

            <div className="mt-20 pl-[200px] w-full">
                <div className="flex items-center justify-center w-full">
                    <div className="stats shadow">
                        <div className="stat">
                            <div className="stat-figure text-primary text-5xl">
                                <FaUser />
                            </div>
                            <div className="stat-title text-3xl">
                                Nombre Total d'Etudiants
                            </div>
                            <div className="stat-value text-primary">{etudiant.length}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-figure text-secondary text-5xl">
                                <FaUsers />
                            </div>
                            <div className="stat-title text-3xl">Effectif par classe</div>
                            <div className="stat-value text-secondary">{liste.length}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <div className="">
                                    <div className="w-16 text-5xl">
                                        <FaRegChartBar />
                                    </div>
                                </div>
                            </div>
                            <div className="stat-title text-3xl">Pourcentage de réussite</div>
                            <div className="stat-value">{pourcentageReussite}%</div>
                        </div>
                    </div>
                </div>

                {/* Filtres */}
                <div className="py-4 rounded-full shadow-2xl justify-center gap-20 my-15 flex items-center max-w-7xl mx-auto">
                    <div className="px-5 py-2 flex items-center gap-3">
                        <p className="text-2xl font-bold">Classe:</p>
                        <select
                            className="text-xl text-gray-500"
                            onChange={(e) => afficherNom(e.target.value)}
                        >
                            <option value="">Sélectionner</option>
                            {classe.map((cl, index) => (
                                <option value={cl._id} key={index}>
                                    {cl.nom}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="px-5 py-2 flex items-center gap-3">
                        <p className="text-2xl font-bold">Etudiants:</p>
                        <select
                            className="text-xl text-gray-500"
                            value={selectedEtudiant}
                            onChange={(e) => handleEtudiantChange(e.target.value)}
                        >
                            <option value="">Sélectionner</option>
                            {liste.map((et, index) => (
                                <option value={et.matricule} key={index}>
                                    {et.nom} {et.prenom}
                                </option>
                            ))}
                        </select>
                    </div>

                   
                </div>

                {/* Tableau des étudiants */}
                <div className="py-20 px-30">
                    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                        <table className="table">
                            <thead className="text-center">
                                <tr>
                                    <th>#</th>
                                    <th>Nom</th>
                                    <th>Prenom</th>
                                    <th>Date de naissance</th>
                                    <th>Sexe</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {liste.length > 0 ? (
                                    liste.map((et, index) => (
                                        <tr key={et._id || index}>
                                            <td>{index}</td>
                                            <td>{et.nom}</td>
                                            <td>{et.prenom}</td>
                                            <td>{new Date(et.datenaiss).toLocaleDateString()}</td>
                                            <td>{et.sexe}</td>
                                            <td>
                                                <div className="flex items-center gap-4 justify-center">
                                                    <button className="border-2 px-4 py-2 rounded-xl bg-green-600 border-green-400 cursor-pointer duration-200 transition-colors hover:bg-green-800 text-white">
                                                        Modifier
                                                    </button>
                                                    <button onClick={() => supprimerEtudiant(et._id)} className="border-2 px-4 py-2 rounded-xl bg-red-600 border-red-400 cursor-pointer duration-200 transition-colors hover:bg-red-800 text-white">
                                                        Supprimer
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-8 text-gray-500">
                                            {classe.length > 0
                                                ? "Sélectionnez une classe pour afficher les étudiants"
                                                : "Aucune classe disponible"}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Tableau des notes */}
                <div className="py-10 px-30">
                    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                        <table className="table">
                            <thead className="text-center">
                                <tr>
                                    <th></th>
                                    <th>Français</th>
                                    <th>Mathématique</th>
                                    <th>Anglais</th>
                                    <th>SVT</th>
                                    <th className="tex-center">
                                        Moyenne
                                        <div className="flex items-center gap-6 justify-between">
                                            <p>Français</p>
                                            <p>Mathématique</p>
                                            <p>Anglais</p>
                                            <p>SVT</p>
                                        </div>
                                    </th>
                                    <th>Moyenne Générale</th>
                                    <th>Status</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {notes.length > 0 ? (
                                    notes.map((n, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {n.francais ? n.francais.slice(0, 2).join(', ') : "N/A"}
                                            </td>
                                            <td>
                                                {n.mathematique ? n.mathematique.slice(0, 2).join(', ') : "N/A"}
                                            </td>
                                            <td>
                                                {n.anglais ? n.anglais.slice(0, 2).join(', ') : "N/A"}
                                            </td>
                                            <td>
                                                {n.svt ? n.svt.slice(0, 2).join(', ') : "N/A"}
                                            </td>
                                            <td>
                                                <div className="flex items-center gap-6 justify-between">
                                                    <p>{n.francais ? n.francais[2] || "N/A" : "N/A"}</p>
                                                    <p>{n.mathematique ? n.mathematique[2] || "N/A" : "N/A"}</p>
                                                    <p>{n.anglais ? n.anglais[2] || "N/A" : "N/A"}</p>
                                                    <p>{n.svt ? n.svt[2] || "N/A" : "N/A"}</p>
                                                </div>
                                            </td>
                                            <td>{n.moyenneGenerale || "N/A"}</td>
                                            <td
                                                className={`${n.moyenneGenerale > 10
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                                    } font-bold`}
                                            >
                                                {n.Status || (n.moyenneGenerale > 10 ? "Admis" : "Recalé")}
                                            </td>
                                            <td>
                                                <div className="flex items-center gap-4 justify-center">
                                                    <button className="border-2 px-4 py-2 rounded-xl bg-green-600 border-green-400 cursor-pointer duration-200 transition-colors hover:bg-green-800 text-white">
                                                        Modifier
                                                    </button>
                                                    <button className="border-2 px-4 py-2 rounded-xl bg-red-600 border-red-400 cursor-pointer duration-200 transition-colors hover:bg-red-800 text-white">
                                                        Supprimer
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="text-center py-8 text-gray-500">
                                            Sélectionnez un étudiant pour afficher ses notes
                                        
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;