import jwt, { JwtPayload } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import prisma from "../db/prisma.js"

interface DecodedToken extends JwtPayload {
  userId: string
}

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string
      }
    }
  }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" })
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" })
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        fullName: true,
        username: true,
        profilePic: true,
      },
    })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    req.user = user

    next()
  } catch (error: any) {
    console.error("Error verifying token: ", error)
    return res.status(401).json({ message: "Unauthorized - Invalid token" })
  }
}

export default verifyToken
