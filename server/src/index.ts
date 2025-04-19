import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import authRoutes from "./routes/auth"
import messageRoutes from "./routes/message"
import { app, server } from "./socket/socket"
import path from "path"

dotenv.config()

/* server */
const PORT = process.env.PORT || 8001

const __dirname = path.resolve()

app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")))
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
  })
}

server.listen(PORT, () => {
  console.log("Server is running on port", PORT)
})
