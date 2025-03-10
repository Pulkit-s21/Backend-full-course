import { VerticalBlog } from "./VerticalBlog"
import { fetchAllBlogs } from "../services/blogServices"
import { useEffect, useMemo, useState } from "react"
import { Pagination } from "@mui/material"
import baseUrl from "../utils/baseUrl"

export const AllBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const [page, setPage] = useState(1)
  const blogsPerPage = 9
  const startIndex = (page - 1) * blogsPerPage

  const getAllBlogs = async () => {
    try {
      const data = await fetchAllBlogs()
      setBlogs(data)
    } catch (err) {
      console.error(err.message)
    }
  }

  // need to be here as blogs are set after the api call
  // needs to re-calc when blogs update so its in useMemo
  const currentData = useMemo(() => {
    return blogs.slice(startIndex, startIndex + blogsPerPage)
  }, [blogs, page])

  // event is required
  const handlePageChange = (e, value) => {
    setPage(value)
  }

  useEffect(() => {
    getAllBlogs()
  }, [page])

  return (
    <div className="h-full flex flex-col items-start mt-8 gap-6">
      <h3 className="xl:text-4xl font-semibold">All blog posts</h3>

      <div className="grid lg:grid-cols-3 w-full gap-6 space-y-3 py-4">
        {/* show blogs as per Pagination and not acc to all blogs */}
        {currentData.length > 0 ? (
          currentData.map((blog) => {
            return (
              <VerticalBlog
                key={blog?.id}
                id={blog?.id}
                image={
                  blog?.image?.startsWith("http")
                    ? blog?.image
                    : `${baseUrl}${blog?.image}`
                }
                username={blog?.user?.username?.split("@")[0]} // getting the part before "@"
                userImg={blog?.user.image}
                title={blog?.title}
                description={blog?.description}
                createdAt={blog?.createdAt}
                tags={blog?.tags}
              />
            )
          })
        ) : (
          <h1 className="text-5xl text-red-500 font-bold">
            No blogs to display yet
          </h1>
        )}
      </div>

      {currentData.length > 0 && (
        <Pagination
          count={Math.ceil(blogs.length / blogsPerPage)}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          sx={{
            marginTop: 2,
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        />
      )}
    </div>
  )
}
