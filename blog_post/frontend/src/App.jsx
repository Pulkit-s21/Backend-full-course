import { Navbar } from "./components/Navbar"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App

// TODO: Create user profile drop down from https://tailgrids.com/react/components/account-dropdown
// TODO: Create a logout api
// TODO: Create login & register pages
