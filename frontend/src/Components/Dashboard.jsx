import  { useEffect, useState } from 'react'
import NavBar from './NavBar'
import toast from 'react-hot-toast'
import axios from 'axios'
import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaRegChartBar } from "react-icons/fa";
const Dashboard = () => {
    const [etudiant, setEtudiant] = useState([])
        const [note, setNote] = useState([])
        useEffect(() => {
        const afficherEtudiant = async () => {
            try {
                const reponse = await axios.get('http://localhost:3000/etudiant');
                if (reponse.data.Status === "Success") {
                    setEtudiant(reponse.data.data); // ✔ Met directement la liste
                }
            } catch (error) {
                console.log(error);
            }
        };
        const afficherNote = async ()=>{
        try {
            const reponse = await axios.get("http://localhost:3000/note")
            if(reponse.data.Status==="Success"){
                setNote(reponse.data.data)
                
            }
        } catch (error) {
            console.log(error)
        }
        }


        afficherEtudiant();
        afficherNote();
    }, []);
    console.log(note)
    return (
        <div className='min-h-screen flex  relative'>
            <NavBar />

            <div className='  mt-20   w-full '>
                <div className='flex items-center justify-center w-full  '>
                    <div className="stats shadow">
                        <div className="stat">
                            <div className="stat-figure text-primary text-5xl">
                                <FaUser />
                            </div>
                            <div className="stat-title text-3xl">Nombre Total d'Etudiants</div>
                            <div className="stat-value text-primary">  {etudiant.length}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-figure text-secondary text-5xl">
                                <FaUsers />
                            </div>
                            <div className="stat-title text-3xl">Effectif par classe</div>
                            <div className="stat-value text-secondary">2.6M</div>
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
                            <div className="stat-value">86%</div>
                        </div>
                    </div>
                </div>
                <div className='py-4 rounded-full  shadow-2xl justify-center my-15 flex items-center max-w-7xl mx-auto'>
                    <div className='px-5 py-2 flex items-center gap-3'>
                        <p className='text-2xl font-bold'>Classe:</p>
                        <select className='text-xl' name="" id="">
                            <option value="">Sélectionner   </option>
                        </select>
                    </div>
                    <div className='px-5 py-2 flex items-center gap-3'>
                        <p className='text-2xl font-bold'>Etudiants:</p>
                        <select className='text-xl' name="" id="">
                            <option value="">Sélectionner </option>
                        </select>
                    </div>
                </div>
                <div className=' py-20 px-30'>
                    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                        <table className="table">
                            {/* head */}
                            <thead className='text-center'>
                                <tr>
                                    <th></th>
                                    <th>Nom</th>
                                    <th>Prenom</th>
                                    <th>Date de naissance</th>
                                    <th>Sexe</th>
                                    <th className='text-center'>Actions </th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {/* row 1 */}
                                {
                                    etudiant.map((e,index)=>(
                                        <tr key={index}>
                                            <td> {index} </td>
                                            <td> {e.nom} </td>
                                            <td> {e.prenom} </td>
                                            <td> {e.datenaiss} </td>
                                            <td> {e.sexe} </td>
                                            <td>
                                                <div className='flex items-center gap-2  justify-center'>
                                                    <button className=' border-2 px-4 py-2 rounded-xl bg-green-600 border-green-400 cursor-pointer duration-200 transition-colors hover:bg-green-800'>Modifier</button>
                                                    <button className=' border-2 px-4 py-2 rounded-xl bg-red-600 border-red-400 cursor-pointer duration-200 transition-colors hover:bg-red-800 '>Supprimer</button>
                                                </div>    
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className=' py-10 px-30'>
                    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                        <table className="table">
                            {/* henoad */}
                            <thead className='text-center'>
                                <tr>
                                    <th></th>
                                    <th>Français</th>
                                    <th>Mathématique</th>
                                    <th>Anglais</th>
                                    <th>SVT</th>
                                    <th className='text-center'>Moyenne
                                       <div className='flex gap-5 text-center justify-between'>
                                        <p>Français</p>
                                        <p>Mathématique</p>
                                        <p>Anglais</p>
                                        <p>SVT</p>
                                        </div> 
                                    </th>
                                    <th>Moyenne générale</th>
                                    <th className='text-center'>Actions </th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {/* row 1 */}
                               {
                                note.map((notes,index)=>(
                                    <tr key={index}>
                                        <td> {index} </td>
                                        <td> {notes.francais[0]} / {notes.francais[1]} </td>
                                        <td>{notes.mathematique[0]} / {notes.mathematique[1]} </td>
                                        <td> {notes.anglais[0]} / {notes.anglais[1]} </td>
                                        <td> {notes.svt[0]} / {notes.svt[1]}  </td>
                                        <td> 
                                         <div className='flex gap-10   justify-between '>
                                        <p>{notes.francais[2]}</p>
                                        <p>{notes.mathematique[2]}</p>
                                        <p> {notes.anglais[2]} </p>
                                        <p> {notes.svt[2]} </p>
                                        </div>     
                                         </td>
                                        <td> {notes.moyenneGenerale} </td>
                                        <td> 
                                             <div className='flex items-center gap-2  justify-center '>
                                                    <button className=' border-2 px-4 py-2 rounded-xl bg-green-600 border-green-400 cursor-pointer duration-200 transition-colors hover:bg-green-800'>Modifier</button>
                                                    <button className=' border-2 px-4 py-2 rounded-xl bg-red-600 border-red-400 cursor-pointer duration-200 transition-colors hover:bg-red-800 '>Supprimer</button>
                                                </div>    

                                        </td>
                                    </tr>
                                ))
                               }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
