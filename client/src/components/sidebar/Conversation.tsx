import { useSocketContext } from "../../context/SocketContext"
import useConversation from "../../zustand/useConversation"

const Conversation = ({ conversation }: { conversation: any }) => {
  const { setSelectedConversation, selectedConversation } = useConversation()
  const { onlineUsers } = useSocketContext()
  const isSelected = selectedConversation?.id === conversation.id

  const isOnline = onlineUsers.includes(conversation.id)

  return (
    <>
      <div
        className={`${
          isSelected ? "bg-indigo-500" : ""
        } flex gap-2 items-center hover:bg-indigo-200 hover:text-black rounded p-2 py-2 cursor-pointer`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className='relative avatar'>
          <div className='w-8 md:w-10 rounded-full'>
            <img src={conversation.profilePic} alt='user avatar' />
          </div>
          {isOnline && (
            <span className='absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white'></span>
          )}
        </div>

        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className=' text-sm md:text-md'>{conversation.fullName}</p>
          </div>
        </div>
      </div>
    </>
  )
}
export default Conversation
