import jwt from "jsonwebtoken"
import { config } from "dotenv"
config()
const { JWT_SECRET }: any = process.env

const auth = async (req: any, res: any, next: any) => {
  try {
    if (req.method === "OPTIONS") {
      return next()
    }

    const auth = req.headers.authorization
    if (!auth) {
      return res.status(401).json("Access denied!")
    }
    const token = auth.split(" ")[1]
    if (!token) {
      return res.status(401).json("Access denied!")
    }

    const { userId }: any = jwt.verify(token, JWT_SECRET)
    if (!userId) {
      return res.status(401).json("Access denied!")
    }
    req.userId = userId
    next()
  } catch (error) {
    res.status(401).json(`Access denied, error: ${error.message}`)
  }
}

export default auth
