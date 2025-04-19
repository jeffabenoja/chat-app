import { useState, useEffect } from "react"
import toast from "react-hot-toast"

const useGetConversation = () => {
  const [loading, setLoading] = useState(false)
  const [conversations, setConversations] = useState<ConversationType[]>([])

  useEffect(() => {
    const getConversation = async () => {
      setLoading(true)
      try {
        const response = await fetch("/api/message/getUserMessages")
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch conversations")
        }

        setConversations(data)
      } catch (error: any) {
        toast.error(error.message || "Failed to fetch conversations", {
          style: {
            color: "#FF0000",
          },
        })
      } finally {
        setLoading(false)
      }
    }

    getConversation()
  }, [])

  return { loading, conversations, setConversations }
}

export default useGetConversation
