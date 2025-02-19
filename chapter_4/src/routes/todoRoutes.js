import express from "express"
import prisma from "../prismaClient.js"

const router = express.Router()

// Get all todos
router.get("/", async (req, res) => {
  const todos = await prisma.todo.findMany({
    where: {
      userId: req.userId,
    },
  })

  if (!todos) {
    return res.status(404).send({ message: "No todos were found!" })
  }
  res.json(todos)
})

// Create todo
router.post("/", async (req, res) => {
  const { task } = req.body
  const todo = await prisma.todo.create({
    data: {
      task,
      userId: req.userId,
    },
  })

  res.json(todo)
})

// Update todo..to update we need primary key in todo table which is id so we get it dynamically
router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { task, completed } = req.body

  const updateTodo = await prisma.todo.update({
    where: {
      userId: req.userId,
      id: parseInt(id),
    },
    data: {
      task,
      completed: !!completed,
    },
  })

  res.json(updateTodo)
})

// Delete todo
router.delete("/:id", async (req, res) => {
  const { id } = req.params

  await prisma.todo.delete({
    where: {
      id: parseInt(id),
      userId: req.userId,
    },
  })

  res.json({ message: "Todo Deleted" })
})

export default router
