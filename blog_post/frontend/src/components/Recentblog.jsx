import { HorizontalBlog } from "./HorizontalBlog"
import { VerticalBlog } from "./VerticalBlog"
import { fetchAllBlogs } from "../services/blogServices"
import { useState, useEffect } from "react"
// import { UserContext } from "../helpers/UserContext"
import moment from "moment"
import baseUrl from "../utils/baseUrl"

export const Recentblog = () => {
  const [blogs, setBlogs] = useState([])

  const getRecentBlogs = async () => {
    try {
      const data = await fetchAllBlogs(3)
      setBlogs(data)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getRecentBlogs()
  }, [])

  return (
    <div className="h-full flex flex-col items-start mt-8 gap-6">
      <h3 className="xl:text-4xl font-semibold">Recent blog posts</h3>

      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <div className="flex-1">
          {blogs.length > 0 ? (
            <VerticalBlog
              key={blogs[0]?.id}
              id={blogs[0]?.id}
              image={
                blogs[0]?.image?.startsWith("http")
                  ? blogs[0]?.image
                  : `${baseUrl}${blogs[0]?.image}`
              }
              username={blogs[0]?.user?.username?.split("@")[0]} // getting the part before "@"
              title={blogs[0]?.title}
              description={blogs[0]?.description}
              createdAt={blogs[0]?.createdAt}
              tags={blogs[0].tags}
            />
          ) : (
            <h1 className="text-5xl text-red-500 font-bold">
              No blogs to display yet
            </h1>
          )}
        </div>
        <div className="flex-1 flex flex-col gap-6">
          {blogs.slice(1).map((blog) => {
            return (
              <HorizontalBlog
                key={blog?.id}
                image={
                  blog?.image?.startsWith("http")
                    ? blog?.image
                    : `${baseUrl}${blog?.image}`
                }
                username={blog?.user?.username?.split("@")[0]} // getting the part before "@"
                title={blog?.title}
                description={blog?.description}
                createdAt={moment(blog?.createdAt).fromNow()}
                tags={blog?.tags}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
