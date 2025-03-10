import { useContext, useEffect, useState } from "react"
import { UserContext } from "../helpers/UserContext"
import { fetchUserBlogs } from "../services/blogServices"
import { VerticalBlog } from "../components/VerticalBlog"
import { BlogForm } from "../components/BlogForm"
import { createRoot } from "react-dom/client"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
import baseUrl from "../utils/baseUrl"

export const Profile = () => {
  const { user } = useContext(UserContext)
  const [blogs, setBlogs] = useState([])
  const [blogCreated, setBlogCreated] = useState(false)

  const MySwal = withReactContent(Swal) // to render a component in swal

  const getUserBlogs = async () => {
    const token = localStorage.getItem("token")
    try {
      const data = await fetchUserBlogs(token)
      setBlogs(data)
    } catch (err) {
      console.error(err.message)
    }
  }

  const creatingBlog = () => {
    MySwal.fire({
      title: "Create <u>blog</u>",
      html: `<div id="blog-form-container"></div>`,
      showCloseButton: true,
      showConfirmButton: false,
      didOpen: () => {
        const container = document.getElementById("blog-form-container")
        if (container) {
          createRoot(container).render(
            <BlogForm
              onSuccess={() => {
                setBlogCreated((prev) => !prev)
                MySwal.close()
              }}
            />
          )
        }
      },
    })
  }

  useEffect(() => {
    getUserBlogs()
  }, [blogCreated])

  return (
    <div className="grid grid-cols-1 gap-4 px-6">
      <h3 className="text-3xl">
        Weclome <span className="capitalize font-bold">{user?.username}</span>{" "}
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {blogs.length > 0 ? (
          blogs.map((blog) => {
            return (
              <VerticalBlog
                key={blog?.id}
                id={blog?.id}
                image={
                  blog?.image?.startsWith("http")
                    ? blog?.image
                    : `${baseUrl}${blog?.image}`
                }
                username={user?.username}
                userImg={user?.image}
                createdAt={blog?.createdAt}
                title={blog?.title}
                description={blog?.description}
                tags={blog?.tags}
                blog={blog}
              />
            )
          })
        ) : (
          <h1 className="text-5xl text-red-500 font-bold">
            No blogs to display yet
          </h1>
        )}
      </div>

      <button
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-400 rounded-full shadow-lg flex items-center justify-center z-30 transform hover:scale-110 hover:bg-red-400 hover:text-white hover:shadow-2xl transition-all"
        onClick={creatingBlog}
      >
        <div className="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-plus"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </div>
      </button>
    </div>
  )
}
