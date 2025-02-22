import axios from "axios"
import baseUrl from "../utils/baseUrl"

// register
export const register = async (userData) => {
  try {
    const res = await axios.post(`${baseUrl}/auth/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return res.data
  } catch (err) {
    console.error(err.message)
    throw err
  }
}

// login
export const login = async (userData) => {
  try {
    const res = await axios.post(`${baseUrl}/auth/login`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (res.data.token) localStorage.setItem("token", res.data.token)

    return res.data
  } catch (err) {
    console.error(err.message)
    throw err
  }
}

// logout
export const logout = () => {
  try {
    // await axios.post(`${baseUrl}/auth/logout`)
    localStorage.removeItem("token")
    window.location.href = "/login"
  } catch (err) {
    console.error(err.message)
    throw err
  }
}
