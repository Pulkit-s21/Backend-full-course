/* eslint-disable react/prop-types */
import { deleteBlog } from "../services/blogServices"
import { useLocation } from "react-router-dom"
import moment from "moment"
import Swal from "sweetalert2"

export const VerticalBlog = ({
  image,
  username,
  createdAt,
  title,
  description,
  tags,
  id,
}) => {
  const location = useLocation()
  const token = localStorage.getItem("token")

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
    <div className="grid grid-cols-1 gap-3 overflow-hidden rounded-t-2xl">
      <img
        className="hover:scale-100 transition-all duration-500 max-w-4xl"
        src={image}
        alt="Blog Image"
      />

      {/* writer div */}
      <div className="flex justify-between pr-4">
        <div className="flex gap-2">
          <p>{username}</p>
          <p>&bull;</p>
          <p className="text-slate-500">{moment(createdAt).fromNow()}</p>
        </div>

        {location.pathname === "/profile" && (
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
            className="bg-red-400 w-fit px-6 py-1 text-white rounded-2xl cursor-pointer"
          >
            Delete
          </button>
        )}
      </div>

      {/* blog info */}
      <div className="grid grid-cols-1 gap-3">
        <h4 className="font-medium xl:text-3xl tracking-wide">{title}</h4>
        <p className="xl:text-base text-slate-500">{description}</p>
      </div>

      {/* tags */}
      <div className="flex flex-row flex-wrap items-end gap-2">
        {tags.map((tag, idx) => {
          return (
            <p
              key={idx}
              className="border-2 rounded-xl px-3 xl:text-xs tracking-widest font-medium hover:text-gray-800 hover:border-slate-500 transition-all duration-200 cursor-pointer"
            >
              {tag}
            </p>
          )
        })}
      </div>
    </div>
  )
}
