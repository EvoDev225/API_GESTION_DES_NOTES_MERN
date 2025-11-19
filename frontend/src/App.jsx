import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./Components/Login"
import {Toaster} from "react-hot-toast"
import Dashboard from "./Components/Dashboard"
import Etudiant from "./Components/Etudiant"
import Insertion from "./Components/Insertion"
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
      </Routes>
    </BrowserRouter>


    </>
  )
}

export default App
