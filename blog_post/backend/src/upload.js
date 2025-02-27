import multer from "multer"
import path from "path"

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

// Initialize multer
export const upload = multer({ storage: storage })
