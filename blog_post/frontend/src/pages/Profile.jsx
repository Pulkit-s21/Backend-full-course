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
    <div className="grid grid-cols-1 gap-3">
      <h3 className="text-3xl">
        Weclome <span>{user?.username}</span>{" "}
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
      </h3>
    </div>
  )
}
