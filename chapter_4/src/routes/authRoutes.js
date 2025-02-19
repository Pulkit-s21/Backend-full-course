import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import prisma from "../prismaClient.js"

const router = express.Router()

// We dont type /auth infront of routes bcz of line 24 in server.js

// Register new user
router.post("/register", async (req, res) => {
  const { username, password } = req.body

  // encrypt the password for safety
  const hashedPswrd = bcrypt.hashSync(password, 8)

  // save new user and hashedPswrd to db
  try {
    // as our db is 3rd party entry so communication btw server and db will be asynchronous
    const user = await prisma.users.create({
      data: {
        username,
        password: hashedPswrd,
      },
    })

    // Add 1st todo for a new user
    const defaultTodo = `Hello :) Add your first todo!`
    await prisma.todo.create({
      data: {
        userId: user.id,
        task: defaultTodo,
      },
    })

    // create a token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRETKEY, {
      expiresIn: "24h",
    })

    res.json({ token })
  } catch (err) {
    console.error(err.message)
    res.status(503)
  }
})

// Login user
router.post("/login", async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await prisma.users.findUnique({
      where: { username },
    })

    if (!user) {
      return res.status(404).send({ message: "User not found!" })
    }

    // comparing pswrd
    const pswrdIsValid = bcrypt.compareSync(password, user.password)

    if (!pswrdIsValid) {
      return res.status(401).send({ message: "Password does not match!" })
    }

    // create token if user is valid
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRETKEY, {
      expiresIn: "24h",
    })

    res.json({ token })
  } catch (err) {
    console.error(err.message)
    res.status(503)
  }
})

export default router
