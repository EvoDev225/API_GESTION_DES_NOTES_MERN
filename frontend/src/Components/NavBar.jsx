import { FaPlusCircle } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { FaEdit } from "react-icons/fa";
const NavBar = () => {
  const navigate = useNavigate()
  const Navigate = ()=>{
          navigate("/")
      }
  return (
    <div className=" flex flex-col py-20 px-5 min-h-screen fixed  w-[200px] shadow-xl ">
            <div className="text-3xl font-bold">
                DashBoard
            </div>
            <div className="mt-20 flex flex-col gap-10">
              <Link to="/notes">
              <div className="flex items-center gap-5 text-xl font-bold p-2 rounded-xl border-l-5 duration-200 transition-all hover:shadow-2xl cursor-pointer hover:-translate-y-2 border-blue-500"><span> <FaPlusCircle /></span>Notes</div>
              </Link>
              <Link to='/insertion'>
                <div className="flex items-center gap-5 text-xl font-bold p-2 rounded-xl border-l-5 duration-200 transition-all hover:shadow-2xl cursor-pointer hover:-translate-y-2 border-green-500"><span><FaPlusCircle /></span>Etudiants</div>
              </Link>
              <Link to='/dashboard'>
                <div className="flex items-center gap-5 text-xl font-bold p-2 rounded-xl border-l-5 duration-200 transition-all hover:shadow-2xl cursor-pointer hover:-translate-y-2 border-red-500"><span><FaFileAlt /></span>Etudiants</div>
              </Link>
              
            </div>
              <span onClick={Navigate}  className="absolute bottom-50 left-15 text-3xl text-red-600 hover:scale-90 duration-200 transition-all cursor-pointer"><HiOutlineLogout /></span>
            
    </div>
  )
}

export default NavBar
