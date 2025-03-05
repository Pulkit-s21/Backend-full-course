/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { updateBlog } from "../services/blogServices"
import { Editor } from "primereact/editor"
import { TagPicker } from "rsuite"
import "rsuite/TagInput/styles/index.css"
import Swal from "sweetalert2"
import baseUrl from "../utils/baseUrl"

export const UpdateForm = ({ onSuccess, blog, id }) => {
  const [blogData, setBlogData] = useState({
    image: blog?.image ? `${baseUrl}${blog?.image}` : null,
    title: blog?.title || "",
    description: blog?.description || "",
    content: blog?.content || "",
    tags: blog?.tags || "",
  })

  const [preview, setPreview] = useState(blogData.image)

  useEffect(() => {
    if (blog?.image) {
      setPreview(`${baseUrl}${blog.image}`)
    }
  }, [blog])

  const handleChange = (e) => {
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setBlogData({ ...blogData, image: file })
      setPreview(URL.createObjectURL(file)) // generate preview url
    }
  }

  const token = localStorage.getItem("token")

  const changeContent = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData() // change to obj for sending image
      formData.append("image", blogData.image)
      formData.append("title", blogData.title)
      formData.append("description", blogData.description)
      formData.append("content", blogData.content)

      blogData.tags.forEach((tag) => {
        formData.append("tags[]", tag)
      })

      const data = await updateBlog(token, formData, id)
      if (data) {
        Swal.fire({
          icon: "success",
          text: "Blog updated",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          onSuccess()
        })
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <form
      onSubmit={changeContent}
      className="grid grid-cols-1 gap-4 text-start"
    >
      {preview && (
        <div className="mb-4">
          <label htmlFor="">Preview</label>
          <img
            className="w-full h-full object-cover"
            src={preview}
            alt="Blog Image Preview"
          />
        </div>
      )}
      <label htmlFor="">Image</label>
      <div className="flex flex-col">
        <input
          type="file"
          className="border-2 border-slate-100 py-1 px-2 outline-none placeholder:text-sm"
          name="image"
          onChange={handleImageChange}
          required
        />
        <p className="text-xs text-slate-400">
          <span className="text-red-500 text-sm">*</span> File type input is
          read-only, please select the image even if same
        </p>
      </div>

      <label htmlFor="">Title</label>
      <input
        type="text"
        name="title"
        placeholder="Title for the blog"
        className="border-2 border-slate-100 py-1 px-2 outline-none placeholder:text-sm"
        onChange={handleChange}
        value={blogData.title}
        required
      />
      <label htmlFor="">Description</label>
      <input
        type="text"
        name="description"
        placeholder="Description of the blog"
        className="border-2 border-slate-100 py-1 px-2 outline-none placeholder:text-sm"
        onChange={handleChange}
        value={blogData.description}
        required
      />
      <label htmlFor="">Content</label>
      <Editor
        value={blogData.content}
        onTextChange={(e) => setBlogData({ ...blogData, content: e.htmlValue })}
        style={{ height: "fit-content" }}
      />
      <label htmlFor="">Tags</label>
      <TagPicker
        creatable
        data={blogData.tags.map((tag) => ({ label: tag, value: tag }))}
        value={blogData.tags}
        onChange={(newTags) => setBlogData({ ...blogData, tags: newTags })}
        placeholder="Type and press Enter"
      />
      <button className="bg-blue-600 hover:bg-red-400 w-fit px-6 py-1 text-white rounded-2xl cursor-pointer">
        Update
      </button>
    </form>
  )
}
