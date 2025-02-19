import jwt from "jsonwebtoken"

function authMiddleWare(req, res, next) {
  const token = req.headers["authorization"]

  if (!token) {
    return res.stauts(401).json({ message: "Token not found!" })
  }

  jwt.verify(token, process.env.JWT_SECRETKEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" })

    req.userId = decoded.id
    next()
  })
}

export default authMiddleWare
