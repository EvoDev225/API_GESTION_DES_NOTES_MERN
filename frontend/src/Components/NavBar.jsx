import { FaPlusCircle } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
const NavBar = () => {
  return (
    <div className=" flex flex-col py-20 px-5 min-h-screen  w-[200px] shadow-xl ">
            <div className="text-3xl font-bold">
                DashBoard
            </div>
            <div className="mt-20 flex flex-col gap-20">
                <div className="flex items-center gap-5 text-xl font-bold p-2 rounded-xl border-l-5 duration-200 transition-all hover:shadow-2xl cursor-pointer hover:-translate-y-2 border-blue-500"><span> <FaPlusCircle /></span>Notes</div>
                <div className="flex items-center gap-5 text-xl font-bold p-2 rounded-xl border-l-5 duration-200 transition-all hover:shadow-2xl cursor-pointer hover:-translate-y-2 border-green-500"><span><FaPlusCircle /></span>Etudiants</div>
                <div className="flex items-center gap-5 text-xl font-bold p-2 rounded-xl border-l-5 duration-200 transition-all hover:shadow-2xl cursor-pointer hover:-translate-y-2 border-red-500"><span><FaFileAlt /></span>Etudiants</div>
            </div>
    </div>
  )
}

export default NavBar
