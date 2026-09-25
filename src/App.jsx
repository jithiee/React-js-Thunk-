import Navbar from "./components/Navbar"
import { Routes , Route } from "react-router-dom"
import Tasks from "./pages/Tasks"
import CreateTask from "./pages/CreateTask"
import EditTask from "./pages/EditTask"


function App() {


  return (
    <>
    <Navbar/>
    <Routes>
        <Route path="/" element={<Tasks/>} />
        <Route path="/create" element={<CreateTask/>} />
        <Route path="/edit/:id" element={<EditTask />} />
    </Routes>
     
    </>
  )
}

export default App
