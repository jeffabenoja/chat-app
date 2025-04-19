import { Response, Request } from "express"
import prisma from "../db/prisma"
import { getReceiverSocketId, io } from "../socket/socket"

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body
    const { id: receiverId } = req.params

    const senderId = req.user.id

    let conversation = await prisma.conversation.findFirst({
      where: {
        participantsIds: {
          hasEvery: [senderId, receiverId],
        },
      },
    })

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participantsIds: {
            set: [senderId, receiverId],
          },
        },
      })
    }

    const newMessage = await prisma.message.create({
      data: {
        senderId,
        conversationId: conversation.id,
        body: message,
      },
    })

    if (newMessage) {
      conversation = await prisma.conversation.update({
        where: { id: conversation.id },
        data: {
          messages: {
            connect: {
              id: newMessage.id,
            },
          },
        },
      })
    }

    const receiverSocketId = getReceiverSocketId(receiverId)

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage)
    }

    res.status(201).json(newMessage)
  } catch (error: any) {
    console.error("Error in sendMessage: ", error.message)
    return res.status(500).json({ message: "Internal server error" })
  }
}

export const getMessage = async (req: Request, res: Response) => {
  try {
    const { id: userToChatId } = req.params
    const senderId = req.user.id

    const conversation = await prisma.conversation.findFirst({
      where: {
        participantsIds: {
          hasEvery: [senderId, userToChatId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    })

    if (!conversation) {
      return res.status(200).json([])
    }

    res.status(200).json(conversation.messages)
  } catch (error: any) {
    console.error("Error in getMessage: ", error.message)
    return res.status(500).json({ message: "Internal server error" })
  }
}

export const getUserMessage = async (req: Request, res: Response) => {
  try {
    const authUserId = req.user.id

    const users = await prisma.user.findMany({
      where: {
        id: { not: authUserId },
      },
      select: {
        id: true,
        fullName: true,
        profilePic: true,
      },
    })
    const usersWithLastMessage = await Promise.all(
      users.map(async (user) => {
        const conversation = await prisma.conversation.findFirst({
          where: {
            participantsIds: {
              hasEvery: [authUserId, user.id],
            },
          },
          include: {
            messages: {
              take: 1,
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        })

        const lastMessage = conversation?.messages?.[0] ?? null

        return {
          ...user,
          lastMessage,
        }
      })
    )

    res.status(200).json(usersWithLastMessage)
  } catch (error: any) {
    console.error("Error in getUserMessage: ", error.message)
    return res.status(500).json({ message: "Internal server error" })
  }
}
