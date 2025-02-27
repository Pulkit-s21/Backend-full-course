import axios from "axios"
import baseUrl from "../utils/baseUrl"

// register
export const register = async (userData) => {
  try {
    const res = await axios.post(`${baseUrl}/auth/register`, userData)
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

    return res.data
  } catch (err) {
    console.error(err.message)
    throw err
  }
}

// user details
export const getUserDetails = async (id, token) => {
  try {
    const res = await axios.get(`${baseUrl}/auth/users/${id}`, {
      headers: {
        Authorization: token,
      },
    })

    return res.data
  } catch (err) {
    console.error(err.message)
    throw err
  }
}
