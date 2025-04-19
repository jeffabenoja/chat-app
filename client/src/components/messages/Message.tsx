import { useAuth } from "../../context/AuthContext"
import useConversation from "../../zustand/useConversation"

export const Message = ({ message }: { message: MessageType }) => {
  const { authUser } = useAuth()
  const { selectedConversation } = useConversation()

  const fromMe = message.senderId === authUser?.id
  const chatClass = fromMe ? "chat-end" : "chat-start"
  const img = fromMe ? authUser?.profilePic : selectedConversation?.profilePic

  const bubbleBg = fromMe ? "bg-gray-600" : "bg-gray-700"

  return (
    <div className={`chat ${chatClass}`}>
      <div className='hidden md:block chat-image avatar'>
        <div className='w-6 md:w-10 rounded-full'>
          <img alt='Chat avatar' src={img} />
        </div>
      </div>

      <p
        className={`chat-bubble text-white ${bubbleBg} text-sm md:text-md border border-gray-600`}
      >
        {message.body}
      </p>

      <span className='chat-footer opacity-50 text-xs flex gap-1 items-center text-gray-400'>
        {extractTime(message.createdAt)}
      </span>
    </div>
  )
}

function extractTime(datetimeStr: string | undefined) {
  if (!datetimeStr) {
    return ""
  }

  const isoString = datetimeStr.replace(" ", "T")

  const date = new Date(isoString)

  if (isNaN(date.getTime())) {
    return ""
  }

  const pad = (num: number) => String(num).padStart(2, "0")

  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())

  return `${hours}:${minutes}`
}
