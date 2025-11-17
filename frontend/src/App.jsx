import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./Components/Login"
import {Toaster} from "react-hot-toast"
import Dashboard from "./Components/Dashboard"
function App() {
  return (
    <>
    <Toaster/>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login/>} ></Route>
          <Route path="/dashboard" element={<Dashboard/>} ></Route>
      </Routes>
    </BrowserRouter>


    </>
  )
}

export default App
