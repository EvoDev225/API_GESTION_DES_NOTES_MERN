import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./Components/Login"
import {Toaster} from "react-hot-toast"
import Dashboard from "./Components/Dashboard"
import Etudiant from "./Components/Etudiant"
import Insertion from "./Components/Insertion"
import Notes from "./Components/Notes"
import MajEtudiant from "./MajEtudiant"
import MajNote from "./MajNote"

function App() {
  return (
    <>
    <Toaster/>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login/>} ></Route>
          <Route path="/dashboard" element={<Dashboard/>} ></Route>
          <Route path="/resultat/:matricule" element={<Etudiant/>} ></Route>
          <Route path="/insertion" element={<Insertion/>} ></Route>
          <Route path="/notes" element={<Notes/>} ></Route>
          <Route path="/majEtudiant/:matricule" element={<MajEtudiant/>} ></Route>
          <Route path="/majNote/:matricule" element={<MajNote/>} ></Route>
      </Routes>
    </BrowserRouter>


    </>
  )
}

export default App
