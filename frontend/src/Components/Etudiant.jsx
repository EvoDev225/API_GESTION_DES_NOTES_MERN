import { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import axios from "axios"
import { useState } from "react";
import toast from "react-hot-toast";
import { IoIosCloseCircleOutline } from "react-icons/io";
const Etudiant = () => {
    const navigate = useNavigate()
    const matricule = useParams()
    const [etudiant, setEtudiant] = useState([])
    const [note, setNote] = useState([])
    useEffect(() => {
        const fetchEtudiant = async () => {
            try {
                const reponse = await axios.get(`http://localhost:3000/etudiant/${matricule.matricule}`)
                if (reponse.data.Status === "Success") {
                    setEtudiant(reponse.data.data)
                    toast.success(reponse.data.message)

                }
            } catch (error) {
                toast.error(error.response?.data?.error)
            }

        }
        const fetchNote = async () => {
            try {
                const notes = await axios.post(`http://localhost:3000/note/etudiant`, { matricule: matricule.matricule })
                if (notes.data.Status === "Success") {
                    setNote(notes.data.data)
                    toast.success(notes.data.message)
                }
            } catch (error) {
                toast.error(error.response?.data?.error)
            }


        }

        fetchEtudiant()
        fetchNote()
    }, [matricule])
    const Navigate = ()=>{
        navigate("/")
    }
    return (
        <div className='w-full min-h-screen flex items-center'>
            <div className='w-5xl mx-auto p-10  rounded-2xl shadow-2xl'>
                <div className="w-full flex justify-end text-5xl">
                   <span onClick={Navigate} className=" text-red-500 cursor-pointer duration-200 transition-all hover:scale-90"> <IoIosCloseCircleOutline /></span>
                </div>
                <div className='w-full flex items-center justify-around'>
                    <div className=" text-5xl p-10 rounded-4xl border ">
                        <FaUser />
                    </div>
                    <div className="w-1/3 flex flex-col gap-5">
                        <p className="text-2xl font-medium  gap-5 flex items-center">Matricule:<span className=" "> {etudiant.matricule} </span></p>
                        <p className="text-2xl font-medium  gap-5 flex items-center">Nom:<span className=" ">{etudiant.nom}</span></p>
                        <p className="text-2xl font-medium  gap-5 flex items-center">Prénom:<span className=" ">{etudiant.prenom}</span></p>
                        <p className="text-2xl font-medium  gap-5 flex items-center">Date de naissance:<span className=" ">{etudiant.datenaiss}</span></p>
                        <p className="text-2xl font-medium  gap-5 flex items-center">Sexe:<span className=" ">{etudiant.sexe}</span></p>
                    </div>
                    <div>
                        
                    </div>
                </div>
                <div className=" my-15 text-xl   rounded-t-xl shadow-2xs border border-gray-500">
                    <table className=" w-full ">
                        <thead className="border-b border-gray-500">
                            <tr className="border-b">
                                <th className="text-start pl-5">Matière</th>
                                <th>Devoir Surveillé</th>
                                <th>Devoir Examen</th>
                                <th> Moyenne</th>
                            </tr>
                        </thead>
                        {
                            note.map((n, index) => (
                                <tbody key={index} className="  ">
                                    <tr className="border-b">
                                        <th className="text-start pl-5">Français</th>
                                        <th> {n.francais[0]} </th>
                                        <th>{n.francais[0]} </th>
                                        <th>{n.francais[0]} </th>
                                    </tr>
                                    <tr className="border-b">
                                        <th className="text-start pl-5">Mathématique</th>
                                        <th>{n.mathematique[0]} </th>
                                        <th>{n.mathematique[1]} </th>
                                        <th>{n.mathematique[2]} </th>
                                    </tr>
                                    <tr className="border-b">
                                        <th className="text-start pl-5">Anglais</th>
                                        <th>{n.anglais[0]} </th>
                                        <th>{n.anglais[1]} </th>
                                        <th>{n.anglais[2]} </th>
                                    </tr>
                                    <tr>
                                        <th className="text-start pl-5">SVT</th>
                                        <th>{n.svt[0]} </th>
                                        <th>{n.svt[1]} </th>
                                        <th>{n.svt[2]} </th>
                                    </tr>
                                </tbody>
                            ))
                        }
                    </table>
                </div>
                <div className="w-full p-5  flex justify-end ">
                    {
                        note.map((n, index) => (
                            <div key={index}>
                                <p className="text-2xl font-bold">Moyenne Générale : <span>{n.moyenneGenerale} </span></p>
                                <p className={`text-2xl font-bold `}>Status : <span className={`${n.moyenneGenerale > 10 ? "text-green-500" : "text-red-500"}`}>{n.Status} </span></p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Etudiant
