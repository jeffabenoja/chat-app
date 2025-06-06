import express from "express"
import {
  signup,
  login,
  logout,
  getMySelf,
} from "../controllers/auth.controller.js"
import verifyToken from "../middleware/verifyToken.js"

const router = express.Router()

router.post("/register", signup)
router.post("/login", login)
router.post("/logout", logout)
router.get("/me", verifyToken, getMySelf)

export default router
