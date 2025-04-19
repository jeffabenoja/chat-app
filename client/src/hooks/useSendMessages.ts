import { useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

const useSendMessages = () => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedConversation } = useConversation()

  const sendMessage = async (message: string): Promise<boolean> => {
    if (!selectedConversation) return false
    setLoading(true)
    try {
      const response = await fetch(
        `/api/message/send/${selectedConversation.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
          }),
        }
      )

      const data = await response.json()

      setMessages([...messages, data])
      return true
    } catch (error: any) {
      toast.error(error.message, {
        style: {
          color: "#FF0000",
        },
      })
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    sendMessage,
  }
}

export default useSendMessages
