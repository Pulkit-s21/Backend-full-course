import jwt from "jsonwebtoken"

function authMiddleware(req, res, next) {
  const token = req.headers["authorization"]

  if (!token) return res.status(404).send({ message: "Token not found" })

  jwt.verify(token, process.env.JWT_SECRETKEY, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Invalid token provided" })

    req.userId = decoded.id
    next() // very imp as this makes code move onto next part.
  })
}

export default authMiddleware
