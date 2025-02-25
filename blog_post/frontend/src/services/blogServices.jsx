import axios from "axios"
import baseUrl from "../utils/baseUrl"

// fetch all blogs
export const fetchAllBlogs = async (limit = 3) => {
  try {
    const res = await axios.get(`${baseUrl}/home/all`, {
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

// fetch all blogs for the user
export const fetchUserBlogs = async (token) => {
  try {
    const res = await axios.get(`${baseUrl}/blogs`, {
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
