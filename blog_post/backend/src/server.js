import express, { json } from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"
import authMiddleWare from "./middleware/authMiddleware.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 2104

// middleware
app.use(json())

// Routes
app.use("/auth", authRoutes)
app.use("/blogs", authMiddleWare, blogRoutes)

app.listen(PORT, () => {
  console.info(`Server is running on port: ${PORT}`)
})
