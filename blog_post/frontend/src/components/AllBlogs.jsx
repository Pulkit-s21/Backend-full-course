import { VerticalBlog } from "./VerticalBlog"
import { fetchAllBlogs } from "../services/blogServices"
import { useEffect, useState } from "react"
import baseUrl from "../utils/baseUrl"

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
                username={blog?.user?.username?.split("@")[0]} // getting thepart before "@"
                title={blog?.title}
                description={blog?.description}
                createdAt={blog?.createdAt}
                tags={blog.tags}
              />
            )
          })
        ) : (
          <h1 className="text-5xl text-red-500 font-bold">
            No blogs to display yet
          </h1>
        )}
      </div>
    </div>
  )
}
