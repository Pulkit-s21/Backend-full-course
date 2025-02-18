import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import db from "../db.js"

const router = express.Router()

// We dont type /auth infront of routes bcz of line 24 in server.js

// Register new user
router.post("/register", (req, res) => {
  const { username, password } = req.body

  // encrypt the password for safety
  const hashedPswrd = bcrypt.hashSync(password, 8)

  // save new user and hashedPswrd to db
  try {
    const insertUser = db.prepare(
      `INSERT INTO users (username,password) VALUES (?,?)`
    ) // statement to create User
    const result = insertUser.run(username, hashedPswrd) // these values go into ?,? respectively

    // Add 1st todo for a new user
    const defaultTodo = `Hello :) Add your first todo!`
    const insertTodo = db.prepare(
      `INSERT INTO todos (user_id, task) VALUES (?,?)`
    ) // statement to create first task when user is created

    insertTodo.run(result.lastInsertRowid, defaultTodo) // lastInsertRowid can be found from result. We get the id of last row from table

    // create a token
    const token = jwt.sign(
      { id: result.lastInsertRowid },
      process.env.JWT_SECRETKEY,
      { expiresIn: "24h" }
    )

    res.json({ token })
  } catch (err) {
    console.error(err.message)
    res.status(503)
  }
})

// Login user
router.post("/login", (req, res) => {
  const { username, password } = req.body

  try {
    const getUser = db.prepare(`SELECT * FROM users WHERE username = ?`)
    const user = getUser.get(username)

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
