import express from "express"
import verifyToken from "../middleware/verifyToken"
import {
  sendMessage,
  getMessage,
  getUserMessage,
} from "../controllers/message.controller"

const router = express.Router()

router.get("/getUserMessages", verifyToken, getUserMessage)
router.post("/send/:id", verifyToken, sendMessage)
router.get("/get/:id", verifyToken, getMessage)

export default router
