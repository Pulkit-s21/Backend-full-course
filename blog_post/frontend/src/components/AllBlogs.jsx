import { VerticalBlog } from "./VerticalBlog"
import { fetchAllBlogs } from "../services/blogServices"
import { useEffect, useState } from "react"

export const AllBlogs = () => {
  const [blogs, setBlogs] = useState([])

  const getAllBlogs = async () => {
    try {
      const data = await fetchAllBlogs()
      setBlogs(data)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getAllBlogs()
  }, [])

  return (
    <div className="h-full flex flex-col items-start mt-8 gap-6">
      <h3 className="xl:text-4xl font-semibold">All blog posts</h3>

      <div className="grid lg:grid-cols-3 w-full gap-6 space-y-3 py-4">
        {blogs.map((blog) => {
          return (
            <VerticalBlog
              key={blog?.id}
              image={blog?.image}
              username={blog?.user?.username?.split("@")[0]} // getting thepart before "@"
              title={blog?.title}
              description={blog?.description}
              createdAt={blog?.createdAt}
              tags={blog.tags}
            />
          )
        })}
      </div>
    </div>
  )
}
