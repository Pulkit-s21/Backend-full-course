import { Router } from "express"
import prisma from "../prismaClient.js"

const router = Router()

// get all blogs
router.get("/all", async (req, res) => {
  const limit = parseInt(req.query.limit) || 10
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        title: {
          not: "Blog title",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      // need to send this part explicitly
      include: {
        user: {
          select: {
            username: true,
            email: true,
          },
        },
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

export default router
