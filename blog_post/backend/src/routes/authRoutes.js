import { Router } from "express"
import { upload } from "../upload.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import prisma from "../prismaClient.js"
import authMiddleWare from "../middleware/authMiddleware.js"

const router = Router()

// register
router.post("/register", upload.single("image"), async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password)
      return res
        .status(404)
        .send({ message: "Username, email and password are required" })

    const hashedPswrd = bcrypt.hashSync(password, 8) // hashing pswrd for security

    const user = await prisma.users.findUnique({
      where: { email },
    })

    if (user) {
      return res
        .status(401)
        .json({ message: "User already exists with this email" })
    } else {
      await prisma.users.create({
        data: {
          username,
          email,
          image: req.file ? `/uploads/${req.file.filename}` : null,
          password: hashedPswrd,
        },
      })
    }

    // default blog on creation of new user
    await prisma.blog.create({
      data: {
        userId: user.id,
        image:
          "https://images.unsplash.com/photo-1485988412941-77a35537dae4?q=80&w=1792&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Blog title",
        description: "Example blog post",
        content: "This is an example blog post",
        tags: ["Example"],
      },
    })

    // create a token for new user
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRETKEY, {
      expiresIn: "24h",
    })

    res.json({ token })
  } catch (err) {
    console.error(err.message)
    res.status(503).send({ message: "Something went wrong" })
  }
})

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      return res
        .status(404)
        .send({ message: "Email and password are required" })

    const user = await prisma.users.findUnique({
      where: { email },
    })

    if (!user) return res.status(404).send({ message: "User not found!!" })

    const pswrdIsValid = bcrypt.compareSync(password, user.password)

    if (!pswrdIsValid)
      return res.status(401).send({ message: "Invalid password" })

    // create a token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRETKEY, {
      expiresIn: "24h",
    })

    res.json({ token })
  } catch (err) {
    console.error(err.message)
    res.status(503).send({ message: "Something went wrong!!" })
  }
})

// user details
router.get("/users/:id", authMiddleWare, async (req, res) => {
  const { id } = req.params
  try {
    if (req.userId !== parseInt(id)) {
      return res.status(503).json({ message: "Forbidden: Access Denied!!" })
    }
    const user = await prisma.users.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        username: true,
        email: true,
        image: true,
      },
    })

    if (!user) return res.status(404).json({ message: "User not found" })

    return res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(503).send({ message: "Something went wrong!!" })
  }
})

export default router
