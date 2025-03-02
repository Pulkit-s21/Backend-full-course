/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import { getUserDetails } from "../services/authServices"

// Create UserContext
export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeUser = async () => {
      const storedToken = localStorage.getItem("token")
      if (!storedToken) {
        setIsLoggedIn(false)
        setLoading(false)
        return
      }
      try {
        const decodedUser = jwtDecode(storedToken)
        const userData = await getUserDetails(decodedUser.id, storedToken)
        setUser(userData)
        setIsLoggedIn(true)
      } catch (error) {
        console.error("Invalid token", error)
        logout()
      } finally {
        setLoading(false)
      }
    }

    initializeUser()
  }, [])

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, logout, isLoggedIn, loading }}
    >
      {!loading && children}
    </UserContext.Provider>
  )
}
