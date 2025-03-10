/* eslint-disable react/prop-types */
// import { useState } from "react"
import { useLocation } from "react-router-dom"
import { createRoot } from "react-dom/client"
import { deleteBlog } from "../services/blogServices"
import { UpdateForm } from "./UpdateForm"
import moment from "moment"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import baseUrl from "../utils/baseUrl"

export const VerticalBlog = ({
  image,
  username,
  createdAt,
  title,
  description,
  tags,
  id,
  blog,
  userImg,
}) => {
  const location = useLocation()
  const token = localStorage.getItem("token")
  //   const [blogCreated, setBlogCreated] = useState(false)

  const MySwal = withReactContent(Swal)

  const updatingBlog = (blog, id) => {
    MySwal.fire({
      title: "Update <i><u>blog</u></i>",
      html: `<div id="blog-form-container"></div>`,
      showCloseButton: true,
      showConfirmButton: false,
      didOpen: () => {
        const container = document.getElementById("blog-form-container")
        if (container) {
          createRoot(container).render(
            <UpdateForm
              blog={blog}
              id={id}
              onSuccess={() => {
                // setBlogCreated((prev) => !prev)
                MySwal.close()
              }}
            />
          )
        }
      },
    })
  }

  const removeBlog = async (id) => {
    try {
      const data = await deleteBlog(token, id)
      if (data) {
        Swal.fire({
          icon: "success",
          title: "Blog Deleted",
          timer: 2000,
          showConfirmButton: false,
        })
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-5 overflow-hidden cursor-pointer">
      <div className="max-w-full aspect-video">
        <img
          className="w-full h-full object-cover rounded-2xl shadow-xl"
          src={image}
          alt="Blog Image"
        />
      </div>

      <div className="flex flex-col gap-2 px-2">
        {/* writer div */}
        <div className="flex justify-between items-center pr-4">
          <div className="flex gap-2">
            <p className="font-medium text-slate-500">
              {moment(createdAt).format("MMMM D, YYYY")}
            </p>
            {/* tags */}
            <div className="flex flex-row flex-wrap items-end gap-2">
              {tags.map((tag, idx) => {
                return (
                  <p
                    key={idx}
                    className="rounded-xl px-4 py-1 xl:text-xs text-gray-500 cursor-pointer bg-gray-50"
                  >
                    {tag}
                  </p>
                )
              })}
            </div>
          </div>

          {location.pathname === "/profile" && (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  updatingBlog(blog, id)
                }}
                className="bg-blue-400 w-fit p-2 text-white rounded-full cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-pen"
                >
                  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                </svg>
              </button>
              <button
                onClick={() =>
                  Swal.fire({
                    icon: "warning",
                    title: "Are you sure you want to delete it ?",
                    showCancelButton: true,
                    cancelButtonColor: "orange",
                    confirmButtonText: "Yes",
                    confirmButtonColor: "red",
                  }).then((res) => {
                    if (res.isConfirmed) {
                      removeBlog(id)
                    }
                  })
                }
                className="bg-red-400 w-fit p-2 text-white rounded-full cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-trash-2"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" x2="10" y1="11" y2="17" />
                  <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* blog info */}
        <div className="grid grid-cols-1 gap-3">
          <h4 className="font-medium xl:text-3xl tracking-wide">{title}</h4>
          <p className="xl:text-base text-slate-500">{description}</p>
        </div>

        {/* user blog */}
        <div className="flex gap-3 items-center">
          <img
            src={`${baseUrl}${userImg}`}
            className="w-10 h-10 object-cover rounded-full"
            alt="Img"
          />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-slate-600">{username}</p>
            <p className="text-xs text-slate-600">Writer</p>
          </div>
        </div>
      </div>
    </div>
  )
}
