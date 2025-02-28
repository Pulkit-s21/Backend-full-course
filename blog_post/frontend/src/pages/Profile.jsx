import { useContext, useEffect, useState } from "react"
import { UserContext } from "../helpers/UserContext"
import { fetchUserBlogs } from "../services/blogServices"
import { VerticalBlog } from "../components/VerticalBlog"

export const Profile = () => {
  const { user } = useContext(UserContext)
  const [blogs, setBlogs] = useState([])

  const getUserBlogs = async () => {
    const token = localStorage.getItem("token")
    try {
      const data = await fetchUserBlogs(token)
      setBlogs(data)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getUserBlogs()
  }, [])

  return (
    <div className="absolute grid grid-cols-1 gap-4 px-6">
      <h3 className="text-3xl">
        Weclome <span className="capitalize font-bold">{user?.username}</span>{" "}
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {blogs.map((blog) => {
          return (
            <VerticalBlog
              key={blog?.id}
              image={blog?.image}
              username={user?.username}
              createdAt={blog?.createdAt}
              title={blog?.title}
              description={blog?.description}
              tags={blog?.tags}
            />
          )
        })}
      </div>

      <div className="relative bottom-0">
        <p>Hello</p>
      </div>
    </div>
  )
}
