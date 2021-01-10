import { User } from "../models"
import { validationResult } from "express-validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { config } from "dotenv"
config()

const { JWT_SECRET } = process.env

export const register_user = async (req: any, res: any) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { username, email, password, role, ava } = req.body
    console.log(req.body)

    const userByUsername = await User.findOne({ username })
    const userByemail = await User.findOne({ email })
    const isUserByUsername =
      userByUsername && Object.values(userByUsername).length
    const isUserByEmail = userByemail && Object.values(userByemail).length
    if (isUserByUsername && isUserByEmail) {
      return res.status(400).json({
        errors: [
          { msg: "Username is not unique!", param: "username" },
          { msg: "Email is not unique!", param: "email" },
        ],
      })
    } else if (isUserByUsername) {
      return res.status(400).json({
        errors: [
          {
            msg: "User with this username is already exists!",
            param: "username",
          },
        ],
      })
    } else if (isUserByEmail) {
      return res.status(400).json({
        errors: [
          { msg: "User with this email is already exists!", param: "email" },
        ],
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = new User({
      username,
      email,
      role,
      password: hashedPassword,
      ava,
      date: new Date(),
    })
    const newUser = await user.save()

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET)
    res.status(201).json({ token, user: newUser })
  } catch (error) {
    res.status(400).json(`Register user error: ${error.message}`)
  }
}

export const login_user = async (req: any, res: any) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    const user: any = await User.findOne({ email })
    const isUser = user && Object.values(user).length
    if (!isUser) {
      return res.status(400).json({
        errors: [
          { msg: "User with this email is not exists!", param: "email" },
        ],
      })
    }

    const comparedPassword = await bcrypt.compare(password, user.password)
    if (!comparedPassword) {
      return res.status(400).json({
        errors: [{ msg: "Password is wrong!", param: "password" }],
      })
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET)
    res.status(201).json({ token, user })
  } catch (error) {
    res.status(400).json(`Login user error: ${error.message}`)
  }
}

export const get_user = async (req: any, res: any) => {
  try {
    const { userId } = req.params
    const user = await User.findById(userId).select("-password")

    res.json(user)
  } catch (error) {
    res.status(400).json(`Getting user info error: ${error.message}`)
  }
}

export const get_users = async (req: any, res: any) => {
  try {
    const users = await User.find().select("ava username email role")

    res.json(users)
  } catch (error) {
    res.status(400).json(`Getting users error: ${error.message}`)
  }
}

export const update_user = async (req: any, res: any) => {
  try {
    const { userId } = req
    await User.updateOne({ _id: userId }, { ...req.body })
    const userUpadted = await User.findById(userId).select("-password")
    res.json(userUpadted)
  } catch (error) {
    res.status(400).json(`Update user error: ${error.message}`)
  }
}
