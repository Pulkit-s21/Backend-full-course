import express, { json } from "express"
import path, { dirname } from "path"
import { fileURLToPath } from "url"
import authRoutes from "./routes/authRoutes.js"
import todoRoutes from "./routes/todoRoutes.js"
import authMiddleWare from "./middleware/authMiddleware.js"

const app = express()
const PORT = process.env.PORT || 2104

const __fileName = fileURLToPath(import.meta.url) // file path
const __dirName = dirname(__fileName) // directory path

// Middleware
app.use(json())
// Tells express to serve all files from public as static assets file
app.use(express.static(path.join(__dirName, "../public")))

// Serving HTML file from /public dir
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirName, "public", "index.html"))
})

// * Routes
// It takes the route from authRoutes and smashes them infront of /auth so they dont need /auth
app.use("/auth", authRoutes)
// It takes the route from todoRoutes and smashes them infront of /todd so they dont need /todos
app.use("/todos", authMiddleWare, todoRoutes) // middleware ensures that token is valid before doing CRUD tasks

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
