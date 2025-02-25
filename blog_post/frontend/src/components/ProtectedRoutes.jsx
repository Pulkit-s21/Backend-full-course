/* eslint-disable react/prop-types */
import { useContext } from "react"
import { UserContext } from "../helpers/UserContext"
import { Navigate } from "react-router-dom"

export const ProtectedRoutes = ({ element }) => {
  const { isLoggedIn, loading } = useContext(UserContext)

  if (loading) return null

  return isLoggedIn ? element : <Navigate to={"/login"} replace />
}
