import express, { json } from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"
import unAuthenticatedRoutes from "./routes/unAuthenicatedRoutes.js"
import authMiddleWare from "./middleware/authMiddleware.js"
import cors from "cors"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 2104

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
)
// middleware
app.use(json())

// Serve static files
app.use("/uploads", express.static("uploads"))

// Routes
app.use("/auth", authRoutes)
app.use("/blogs", authMiddleWare, blogRoutes)
app.use("/home", unAuthenticatedRoutes)

app.listen(PORT, () => {
  console.info(`Server is running on port: ${PORT}`)
})
