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
// : Create option to add a blog from profile page : DONE
// : Create option to delete a blog BUT only if you are logged in : DONE
// : Create option to update a blog : DONE
// : Create option to preview selected image : DONE
// : Create option to add user image while registering : DONE
// : Hide "Get started" button if loggedIn : DONE
// : Fix "user is null" error on login page : DONE
// : Show error msg on Login and Register page : DONE
// : Logout when token is expired : DONE
// TODO: Fix "Changing token doesnt kick user out"
