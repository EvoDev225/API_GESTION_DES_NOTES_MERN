
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import NavBar from "./Components/NavBar";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
const MajNote = () => {
    const navigate = useNavigate()
    const {matricule} = useParams()
    const [etudiant, setEtudiant] = useState([]);
    const [notes, setNotes] = useState({
            matetud: "",
            francais: [0, 0, 0, 0], // [DS, DE, moyenne, coefficient]
            mathematique: [0, 0, 0, 0],
            anglais: [0, 0, 0, 0],
            svt: [0, 0, 0, 0],
            moyenneGenerale: 0,
            Status: ""
        });
    
        // Coefficients par matière
        const coefficients = {
            francais: 3,
            mathematique: 4,
            anglais: 2,
            svt: 4
        };
        useEffect(()=>{
            const fetchData = async ()=>{
                try {
                const note = await axios.get(`http://localhost:3000/note/notes/${matricule}`)
                if(note.data.Status==="Success"){
                    setNotes(note.data.data[0])
                    toast.success(note.data.message)
                }
            } catch (error) {
                console.log(error)
            }
            }
            fetchData()
        },[])
        const majNote = async (e)=>{
            e.preventDefault()
            try {
                const maj = await axios.put(`http://localhost:3000/note/${notes._id}`,notes)
                if(maj.data.Status==="Success"){
                    toast.success(maj.data.message)
                    navigate("/dashboard")
                }
            } catch (error) {
                console.log(error)
            }
        }
    
        // Fonction pour calculer la moyenne d'une matière: (DS + DE*2) / 3
        const calculerMoyenneMatiere = (ds, de) => {
            const moyenne = (parseFloat(ds || 0) + parseFloat(de || 0) * 2) / 3;
            return Math.round(moyenne * 100) / 100; // Arrondir à 2 décimales
        }
    
        // Fonction pour calculer la moyenne générale
        const calculerMoyenneGenerale = (notesData) => {
            const totalCoef = coefficients.francais + coefficients.mathematique + 
                            coefficients.anglais + coefficients.svt;
            
            const sommeNotes = (notesData.francais[2] * coefficients.francais) +
                              (notesData.mathematique[2] * coefficients.mathematique) +
                              (notesData.anglais[2] * coefficients.anglais) +
                              (notesData.svt[2] * coefficients.svt);
            
            const moyenneGen = sommeNotes / totalCoef;
            return Math.round(moyenneGen * 100) / 100;
        }
    
        // Déterminer le statut
        const determinerStatus = (moyenneGen) => {
            return moyenneGen >= 10 ? "Admis" : "Recalé";
        }
    
        // Mise à jour des notes avec calcul automatique
        const updateNote = (matiere, index, value) => {
            const newNotes = { ...notes };
            newNotes[matiere][index] = parseFloat(value || 0);
            
            // Calculer la moyenne de la matière (DS à index 0, DE à index 1)
            const moyenne = calculerMoyenneMatiere(newNotes[matiere][0], newNotes[matiere][1]);
            newNotes[matiere][2] = moyenne;
            newNotes[matiere][3] = coefficients[matiere];
            
            // Calculer la moyenne générale
            const moyenneGen = calculerMoyenneGenerale(newNotes);
            newNotes.moyenneGenerale = moyenneGen;
            
            // Déterminer le statut
            newNotes.Status = determinerStatus(moyenneGen);
            
            setNotes(newNotes);
        }
    console.log(notes)
       
   return (
        <div className='w-full min-h-screen flex items-center'>
            <NavBar />
            <div className="pl-[200px] mt-20 w-7xl mx-auto p-10 shadow-2xl rounded-2xl">
                <div>
                    <h1 className="text-5xl uppercase font-bold">Modification des notes</h1>
                </div>
                <div className="w-full flex flex-col gap-8 my-15">
                    <div className="flex">
                        <div className="flex flex-col gap-4 px-20">
                            <h1 className="text-3xl font-bold">Matricule étudiant</h1>
                            <input readOnly value={notes.matetud} className="px-8 py-3 border-3 border-gray-500 text-gray-500 rounded-2xl" type="text" onChange={e => setNotes({ ...notes, matetud: e.target.value })} />
                        </div>
                    </div>
                    <form className="flex flex-col items-center gap-5" onSubmit={majNote}>
                        {/* Français */}
                        <div className="flex flex-col gap-4">
                            <h1 className="text-3xl font-bold">Français</h1>
                            <div className="flex items-center gap-10">
                                <div className="flex items-center gap-4">
                                    <h1 className="text-2xl font-medium">DS :</h1>
                                    <input min={0} max={20} value={notes.francais[0] || ''} onChange={e => updateNote('francais', 0, e.target.value)} type="number" step="0.01" className="px-8 py-1 outline-none border-gray-600 text-gray-500 border-3 rounded-xl w-30" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <h1 className="text-2xl font-medium">DE :</h1>
                                    <input min={0} max={20} value={notes.francais[1] || ''} onChange={e => updateNote('francais', 1, e.target.value)} type="number" step="0.01" className="px-8 py-1 outline-none border-gray-600 text-gray-500 border-3 rounded-xl w-30" />
                                    <p>x2</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <h1 className="text-2xl font-medium">Coefficient :</h1>
                                    <input type="number" value="3" readOnly className="px-8 py-1 outline-none border-gray-600 text-gray-500 border-3 rounded-xl w-30" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <h1 className="text-2xl font-medium">Moyenne :</h1>
                                    <input type="number" value={notes.francais[2] || 0} readOnly className="px-8 py-1 outline-none border-gray-600 text-gray-500 border-3 rounded-xl w-30" />
                                </div>
                            </div>
                        </div>

                        {/* Mathématique */}
                        <div className="flex flex-col gap-4">
                            <h1 className="text-3xl font-bold">Mathématique</h1>
                            <div className="flex items-center gap-10">
                                <div className="flex items-center gap-4">
                                    <h1 className="text-2xl font-medium">DS :</h1>
                                    <input min={0} max={20} value={notes.mathematique[0] || ''} onChange={e => updateNote('mathematique', 0, e.target.value)} type="number" step="0.01" className="px-8 py-1 outline-none border-gray-600 text-gray-500 border-3 rounded-xl w-30" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <h1 className="text-2xl font-medium">DE :</h1>
                                    <input min={0} max={20} value={notes.mathematique[1] || ''} onChange={e => updateNote('mathematique', 1, e.target.value)} type="number" step="0.01" className="px-8 py-1 outline-none border-gray-600 text-gray-500 border-3 rounded-xl w-30" />
                                    <p>x2</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <h1 className="text-2xl font-medium">Coefficient :</h1>
                                    <input type="text" value="4" readOnly className="px-8 py-1 outline-none border-gray-600 text-gray-500 border-3 rounded-xl w-30" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <h1 className="text-2xl font-medium">Moyenne :</h1>
                                    <input type="number" value={notes.mathematique[2] || 0} readOnly className="px-8 py-1 outline-none border-gray-600 text-gray-500 border-3 rounded-xl w-30" />
                                </div>
                            </div>
                        </div>

                        {/* Anglais */}
                        <div className="flex flex-col gap-4">
                            <h1 className="text-3xl font-bold">Anglais</h1>
                            <div className="flex items-center gap-10">
                                <div className="flex items-center gap-4">
                                    <h1 className="text-2xl font-medium">DS :</h1>
                                    <input type="number" min={0} max={20} value={notes.anglais[0] || ''} onChange={e => updateNote('anglais', 0, e.target.value)} step="0.01" className="px-8 py-1 outline-none border-gray-600 text-gray-500 border-3 rounded-xl w-30" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <h1 className="text-2xl font-medium">DE :</h1>
                                    <input type="number" min={0} max={20} value={notes.anglais[1] || ''} onChange={e => updateNote('anglais', 1, e.target.value)} step="0.01" className="px-8 py-1 outline-none border-gray-600 text-gray-500 border-3 rounded-xl w-30" />
                                    <p>x2</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <h1 className="text-2xl font-medium">Coefficient :</h1>
                                    <input type="text" value="2" readOnly className="px-8 py-1 outline-none border-gray-600 text-gray-500 border-3 rounded-xl w-30" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <h1 className="text-2xl font-medium">Moyenne :</h1>
                                    <input type="number" value={notes.anglais[2] || 0} readOnly className="px-8 py-1 outline-none border-gray-600 text-gray-500 border-3 rounded-xl w-30" />
                                </div>
                            </div>
                        </div>

                        {/* SVT */}
                        <div className="flex flex-col gap-4">
                            <h1 className="text-3xl font-bold">SVT</h1>
                            <div className="flex items-center gap-10">
                                <div className="flex items-center gap-4">
                                    <h1 className="text-2xl font-medium">DS :</h1>
                                    <input type="number" min={0} max={20} value={notes.svt[0] || ''} onChange={e => updateNote('svt', 0, e.target.value)} step="0.01" className="px-8 py-1 outline-none border-gray-600 text-gray-500 border-3 rounded-xl w-30" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <h1 className="text-2xl font-medium">DE :</h1>
                                    <input type="number" min={0} max={20} value={notes.svt[1] || ''} onChange={e => updateNote('svt', 1, e.target.value)} step="0.01" className="px-8 py-1 outline-none border-gray-600 text-gray-500 border-3 rounded-xl w-30" />
                                    <p>x2</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <h1 className="text-2xl font-medium">Coefficient :</h1>
                                    <input type="text" value="4" readOnly className="px-8 py-1 outline-none border-gray-600 text-gray-500 border-3 rounded-xl w-30" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <h1 className="text-2xl font-medium">Moyenne :</h1>
                                    <input type="text" value={notes.svt[2] || 0} readOnly className="px-8 py-1 outline-none border-gray-600 text-gray-500 border-3 rounded-xl w-30" />
                                </div>
                            </div>
                            <div className="p-5 flex items-center gap-8">
                                <div className="flex items-center gap-4">
                                    <h1 className="text-3xl font-bold">Moyenne Générale :</h1>
                                    <input type="number" value={notes.moyenneGenerale || 0} readOnly className="px-8 py-1 outline-none border-gray-600 text-gray-500 border-3 rounded-xl w-30" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <h1 className="text-3xl font-bold">Status :</h1>
                                    <input type="text" value={notes.Status} readOnly className="px-8 py-1 outline-none border-gray-600 text-gray-500 border-3 rounded-xl w-30" />
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-center items-center">
                            <button type="submit" className="px-12 py-4 text-2xl font-bold border-3 border-gray-600 rounded-3xl text-gray-500 duration-200 transition-all hover:scale-90 cursor-pointer">Enregistrer</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MajNote
