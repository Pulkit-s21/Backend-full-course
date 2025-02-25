import { Router } from "express"
import prisma from "../prismaClient.js"

const router = Router()

// ? db is 3rd party entry so communication btw server and db will be asynchronous

// get all blogs for user
router.get("/", async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        userId: req.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    if (!blogs)
      return res
        .status(404)
        .send({ message: "No blog found associated with the user" })

    res.json(blogs)
  } catch (err) {
    console.error(err.message)
    res.status(503).send({ message: "Something went wrong!!" })
  }
})

// get single blog
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const blog = await prisma.blog.findUnique({
      where: {
        id: parseInt(id), // need to convert to int for prisma
        userId: req.userId,
      },
    })

    if (!blog)
      return res.status(404).send({ message: "No blog found for this id" })

    res.json(blog)
  } catch (err) {
    console.error(err.message)
    res.status(503).send({ message: "Something went wrong!!" })
  }
})

// create blog
router.post("/", async (req, res) => {
  try {
    const { title, description, content, tags, image } = req.body

    if (!title || !description || !content || !tags || !image)
      return res.status(400).json({
        message: "Title, description, content, image and tags are required",
      })

    const blog = await prisma.blog.create({
      data: {
        title,
        description,
        content,
        tags,
        image,
        userId: req.userId,
      },
    })

    res.json(blog)
  } catch (err) {
    console.error(err.message)
    res.status(503).send({ message: "Something went wrong!!" })
  }
})

// update blog
router.put("/:id", async (req, res) => {
  try {
    const { title, description, content } = req.body
    const { id } = req.params

    if (
      (title !== undefined && title.trim().length === 0) ||
      (description !== undefined && description.trim().length === 0) ||
      (content !== undefined && content.trim().length === 0)
    ) {
      return res
        .status(401)
        .send({ message: "If provided in body, then they cannot be empty" })
    }

    const updatedBlog = await prisma.blog.update({
      where: {
        id: parseInt(id),
        userId: req.userId,
      },
      data: {
        title,
        description,
        content,
      },
    })

    res.json(updatedBlog)
  } catch (err) {
    console.error(err.message)
    res.status(503).send({ message: "Something went wrong!!" })
  }
})

// delete blog
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params
    await prisma.blog.delete({
      where: {
        id: parseInt(id),
        userId: req.userID,
      },
    })

    res.json({ message: "Blog Deleted" })
  } catch (err) {
    console.error(err.message)
    res.status(503).send({ message: "Something went wrong!!" })
  }
})

export default router
