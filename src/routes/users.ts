import { Router } from "express"
import { check } from "express-validator"
import {
  register_user,
  login_user,
  get_user,
  get_users,
} from "../controllers/users"
import auth from "../middlewares/auth.middleware"
const router = Router()

router.post(
  "/register",
  [
    check("username")
      .isLength({ min: 4, max: 15 })
      .withMessage("Username must be at least 4 to 15 characters long!"),
    check("email").isEmail().withMessage("Email is not correct!"),
    check("password")
      .isLength({ min: 3, max: 25 })
      .withMessage("Password must be at least 3 to 25 characters long!"),
  ],
  register_user
)

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Email is not correct!"),
    check("password")
      .isLength({ min: 3, max: 25 })
      .withMessage("Password must be at least 3 to 25 characters long!"),
  ],
  login_user
)

router.get("/user-info/:userId", auth, get_user)

router.get("/users", get_users)

export default router
