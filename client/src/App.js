import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import WorkshopDetail from "./pages/WorkshopDetail"
import CreateWorkshop from "./pages/CreateWorkshop"
import EditWorkshop from "./pages/EditWorkshop"

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workshop/:id" element={<WorkshopDetail />} />
          <Route path="/create-workshop" element={<CreateWorkshop />} />
          <Route path="/edit-workshop/:id" element={<EditWorkshop />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
