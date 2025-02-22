import axios from "axios"
import baseUrl from "../utils/baseUrl"

// fetch all blogs
export const fetchAllBlogs = async () => {
  // get token for authentication
  const token = localStorage.getItem("token")
  if (!token) throw new Error("Token not provided!!")

  try {
    const res = await axios.get(`${baseUrl}/blogs/all`, {
      headers: {
        Authorization: `${token}`,
      },
    })
    return res.data
  } catch (err) {
    console.error(err.message)
    throw err
  }
}

// fetch recent blogs
export const fetchRecentBlogs = async (limit = 3) => {
  const token = localStorage.getItem("token")
  if (!token) throw new Error("Token not provided!!")

  try {
    const res = await axios.get(`${baseUrl}/blogs/all`, {
      headers: {
        Authorization: `${token}`,
      },
      params: {
        limit,
      },
    })

    return res.data
  } catch (err) {
    console.error(err.message)
    throw err
  }
}
