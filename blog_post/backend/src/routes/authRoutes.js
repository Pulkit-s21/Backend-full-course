import { Router } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import prisma from "../prismaClient.js"

const router = Router()

// register
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password)
      return res
        .status(404)
        .send({ message: "Username and password are required" })

    const hashedPswrd = bcrypt.hashSync(password, 8) // hashing pswrd for security

    const user = await prisma.users.create({
      data: {
        username,
        password: hashedPswrd,
      },
    })

    // default blog on creation of new user
    await prisma.blog.create({
      data: {
        userId: user.id,
        title: "Blog title",
        description: "Example blog post",
        content: "This is an example blog post",
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
    const { username, password } = req.body

    if (!username || !password)
      return res
        .status(404)
        .send({ message: "Username and password are required" })

    const user = await prisma.users.findUnique({
      where: { username },
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

export default router
