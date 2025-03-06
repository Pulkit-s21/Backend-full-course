/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import { getUserDetails } from "../services/authServices"
import Swal from "sweetalert2"

// Create UserContext
export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  const logoutAlert = () => {
    Swal.fire({
      icon: "info",
      text: "Your session has expired. Please log in again",
      showConfirmButton: true,
      confirmButtonText: "Ok",
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((res) => res.isConfirmed && logout())
  }

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

        // checking if token is expired or not
        const timeUntilTokenExpires = decodedUser.exp * 1000 - Date.now()
        const logoutTimer = setTimeout(() => {
          logoutAlert()
        }, timeUntilTokenExpires)

        return () => clearTimeout(logoutTimer)
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
