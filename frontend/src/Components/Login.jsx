import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router";
import axios from "axios"
import  {useState} from "react"
import toast from "react-hot-toast";
const Login = () => {
  const [matricule,setMatricule] = useState("")
  const navigate = useNavigate()
    const identification = async (e) => {
  e.preventDefault();

  // 1️⃣ Tester ADMIN en premier
  try {
    const reponse = await axios.post("http://localhost:3000/admin/admin", {
      password: matricule
    });

    if (reponse.data.Status === "Success") {
      toast.success(reponse.data.message);
      navigate('/dashboard')
      return; 
    }
  } catch (error) {
  }

  try {
    const etudiant = await axios.post("http://localhost:3000/etudiant/connect", {
      matricule: matricule
    });

    if (etudiant.data.Status === "Success") {
      toast.success(etudiant.data.message);
      return; 
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Identifiants incorrects");
  }
};
    
  return (
    <section className='  min-h-screen '>
      <div className=" max-w-7xl flex items-center justify-center  mx-auto ">
        <div className=" flex gap-5 flex-col items-center shadow-2xl  border-t-5 border-gray-500  my-30  p-20 rounded-2xl">
          <div className="flex items-center justify-center p-5 ">
            <FaUser className="text-6xl" />
          </div>
          <div className="w-full p-5">
            <form action="" className=" flex flex-col gap-3">
              <input type="text" onChange={e=>setMatricule(e.target.value)} name="matricule" id="matricule" className="px-8 py-3 text-gray-300 border-3 rounded border-gray-400 outline-none" placeholder="Entrez votre matricule " />
            </form>
            <div className=" mt-5  w-full p-5 flex justify-center items-center">
              <button onClick={identification} type="submit" className=" duration-200 transition-all hover:scale-90 border-2 cursor-pointer px-10 py-3 rounded-xl text-xl font-bold   border-gray-400 ">
                Valider
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
