import { Navbar } from "./components/Navbar"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Register } from "./pages/Register"
import { Login } from "./pages/Login"
import { Profile } from "./pages/Profile"
import { ProtectedRoutes } from "./components/ProtectedRoutes"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Protected Routes */}
        <Route
          path="/profile"
          element={<ProtectedRoutes element={<Profile />} />}
        />
      </Routes>
    </Router>
  )
}

export default App

// TODO: Create user profile dropdown-https://tailgrids.com/react/components/account-dropdown: DONE
// TODO: Create a logout api: DONE
// TODO: Create login & register pages: DONE
// TODO: Create profile page and make it authenticated route: DONE
