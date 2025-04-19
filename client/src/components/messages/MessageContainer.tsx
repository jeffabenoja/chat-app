import MessageInput from "./MessageInput"
import Messages from "./Messages"
import useConversation from "../../zustand/useConversation"
import { useAuth } from "../../context/AuthContext"

const MessageContainer = () => {
  const { selectedConversation } = useConversation()

  return (
    <div className='w-full flex flex-col'>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className='bg-gray-700 px-4 py-2 mb-2'>
            <span className='text-white font-bold'>
              {selectedConversation.fullName}
            </span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  )
}
export default MessageContainer

const NoChatSelected = () => {
  const { authUser } = useAuth()
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome 👋 {authUser?.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
      </div>
    </div>
  )
}
