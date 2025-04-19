import { useEffect } from "react"
import useConversation from "../zustand/useConversation"
import { useSocketContext } from "../context/SocketContext"

const useListenMessage = () => {
  const { socket } = useSocketContext()
  const { setMessages, messages } = useConversation()

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setMessages([...messages, newMessage])
    })

    return () => {
      socket?.off("newMessage")
    }
  }, [socket, messages, setMessages])
}

export default useListenMessage
