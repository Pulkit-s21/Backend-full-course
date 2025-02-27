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

// : Create user profile dropdown: DONE
// : Create a logout api: DONE
// : Create login & register pages: DONE
// : Create profile page and make it authenticated route: DONE
// TODO: Create option to add a blog from profile page
// TODO: Create option to delete a blog BUT only if you are logged in
