/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import { getUserDetails } from "../services/authServices"
import { Navigate } from "react-router-dom"

// Create UserContext
export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (!storedToken) {
      setIsLoggedIn(false)
      setLoading(false)
      return
    }
    try {
      const decodedUser = jwtDecode(storedToken)
      getUserDetails(decodedUser.id, storedToken)
        .then((userData) => {
          setUser(userData)
        })
        .catch((err) => console.error(err.message))
      setIsLoggedIn(true)
    } catch (error) {
      console.error("Invalid token", error)
      logout()
    } finally {
      setLoading(false)
    }
  }, [])

  const navigateUser = () => {
    return <Navigate to={"/login"} replace />
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem("token")
    navigateUser()
  }

  return (
    <UserContext.Provider value={{ user, logout, isLoggedIn, loading }}>
      {!loading && children}
    </UserContext.Provider>
  )
}
