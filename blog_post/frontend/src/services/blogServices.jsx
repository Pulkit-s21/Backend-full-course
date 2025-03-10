import axios from "axios"
import baseUrl from "../utils/baseUrl"

// fetch all blogs
export const fetchAllBlogs = async (limit) => {
  try {
    const res = await axios.get(`${baseUrl}/home/all`, {
      params: limit ? { limit } : {}, // imp. API takes undefined if not this
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

// create new blog
export const createBlog = async (token, data) => {
  try {
    const res = await axios.post(`${baseUrl}/blogs`, data, {
      headers: {
        Authorization: token,
      },
    })
    return res.data
  } catch (err) {
    console.error(err.message)
  }
}

// update blog
export const updateBlog = async (token, data, id) => {
  try {
    const res = await axios.put(`${baseUrl}/blogs/${id}`, data, {
      headers: {
        Authorization: token,
      },
    })
    return res.data
  } catch (err) {
    console.error(err.message)
  }
}

// delete blog
export const deleteBlog = async (token, id) => {
  try {
    const res = await axios.delete(`${baseUrl}/blogs/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    return res.data
  } catch (err) {
    console.error(err.message)
  }
}
