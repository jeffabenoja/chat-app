import { useState, useEffect } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

const useGetMessages = () => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedConversation } = useConversation()

  useEffect(() => {
    const getMessage = async () => {
      if (!selectedConversation) return
      setLoading(true)
      setMessages([])
      try {
        const res = await fetch(`/api/message/get/${selectedConversation.id}`)
        const data = await res.json()
        setMessages(data)
      } catch (error: any) {
        toast.error(error.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    getMessage()
  }, [selectedConversation, setMessages])

  return {
    loading,
    messages,
  }
}

export default useGetMessages
