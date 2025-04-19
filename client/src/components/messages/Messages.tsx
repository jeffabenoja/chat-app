import useGetMessages from "../../hooks/useGetMessages"
import useListenMessage from "../../hooks/useListenMessage"
import MessageSkeleton from "../skeletons/MessageSkeleton"
import { Message } from "./Message"
import { useEffect, useRef } from "react"

const Messages = () => {
  const bottomRef = useRef<HTMLDivElement>(null)

  const { messages, loading } = useGetMessages()
  useListenMessage()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" })
  }, [messages])

  return (
    <div className='flex-1 overflow-y-auto px-4 space-y-2'>
      {loading && <MessageSkeleton />}

      {!loading &&
        messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}

      {!loading && messages.length === 0 && (
        <p className='text-center text-gray-500 mt-4'>
          Send a message to start the conversation
        </p>
      )}
      <div ref={bottomRef} />
    </div>
  )
}
export default Messages
