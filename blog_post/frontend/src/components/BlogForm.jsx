/* eslint-disable react/prop-types */
import { useState } from "react"
import { createBlog } from "../services/blogServices"
import Swal from "sweetalert2"

export const BlogForm = ({ onSuccess }) => {
  const [blogData, setBlogData] = useState({
    image: null,
    title: "",
    description: "",
    content: "",
    tags: [],
  })

  const token = localStorage.getItem("token")

  const handleChange = (e) => {
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setBlogData({
        ...blogData,
        image: file,
      })
    }
  }

  const handleTagsChange = (e) => {
    setBlogData({
      ...blogData,
      tags: [...(blogData.tags || []), e.target.value],
    })
  }

  const newBlog = async (e) => {
    e.preventDefault()
    try {
      // Convert formData into FormData object for file upload
      const formData = new FormData()
      formData.append("title", blogData.title)
      formData.append("description", blogData.description)
      formData.append("content", blogData.content)
      formData.append("image", blogData.image)
      // Append each tag separately
      blogData.tags.forEach((tag) => {
        formData.append("tags[]", tag)
      })

      const data = await createBlog(token, formData)
      if (data) {
        Swal.fire({
          icon: "success",
          title: "Blog created",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          onSuccess()
        })
      }
    } catch (err) {
      console.error(err.message)
      throw err
    }
  }

  return (
    <form onSubmit={newBlog} className="grid grid-cols-1 gap-4 text-start">
      <label htmlFor="">Image</label>
      <input
        type="file"
        className="border-2 border-slate-100 py-1 px-2 outline-none placeholder:text-sm"
        name="image"
        onChange={handleImageChange}
        required
      />
      <label htmlFor="">Title</label>
      <input
        type="text"
        name="title"
        placeholder="Title for the blog"
        className="border-2 border-slate-100 py-1 px-2 outline-none placeholder:text-sm"
        onChange={handleChange}
        required
      />
      <label htmlFor="">Description</label>
      <input
        type="text"
        name="description"
        placeholder="Description of the blog"
        className="border-2 border-slate-100 py-1 px-2 outline-none placeholder:text-sm"
        onChange={handleChange}
        required
      />
      <label htmlFor="">Content</label>
      <textarea
        name="content"
        placeholder="Content of the blog"
        className="border-2 border-slate-100 py-1 px-2 outline-none placeholder:text-sm"
        onChange={handleChange}
        id=""
      />
      <label htmlFor="">Tags</label>
      <input
        type="text"
        name="tags"
        placeholder="Tags for the blog"
        className="border-2 border-slate-100 py-1 px-2 outline-none placeholder:text-sm"
        onChange={handleTagsChange}
        required
      />
      <button className="bg-blue-600 w-fit px-4 py-1 text-white rounded-2xl cursor-pointer">
        Create
      </button>
    </form>
  )
}
