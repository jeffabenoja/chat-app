import Conversation from "./Conversation"
import useGetConversation from "../../hooks/useGetConversation"
import { Search } from "lucide-react"
import { useState, useEffect } from "react"

const Conversations = () => {
  const { loading, conversations } = useGetConversation()
  const [search, setSearch] = useState("")
  const [filteredConversations, setFilteredConversations] = useState<
    ConversationType[]
  >([])

  useEffect(() => {
    setFilteredConversations(conversations)
  }, [conversations])

  useEffect(() => {
    if (!search.trim()) {
      setFilteredConversations(conversations)
      return
    }

    const filtered = conversations.filter((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    )

    setFilteredConversations(filtered)
  }, [search, conversations])

  return (
    <>
      <div className='flex items-center gap-2 relative'>
        <input
          type='text'
          placeholder='Search...'
          className='w-full py-2 px-4 rounded-full outline-none focus:border-gray-400 focus:ring-gray-600 active:border-gray-400 active:ring-gray-600 bg-gray-800 text-white placeholder-gray-400'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2'>
          <Search className='w-4 h-4 md:w-4 md:h-4' />
        </div>
      </div>

      <div className='py-2 flex flex-col overflow-auto'>
        {loading && (
          <div className='flex items-center justify-center py-6'>
            <div className='w-10 h-10 border-2 border-t-transparent border-gray-100 rounded-full animate-spin'></div>
          </div>
        )}

        {!loading && filteredConversations.length === 0 && (
          <div className='text-center text-gray-400 py-4'>
            No conversations found.
          </div>
        )}

        {filteredConversations.map((conversation) => (
          <Conversation key={conversation.id} conversation={conversation} />
        ))}
      </div>
    </>
  )
}

export default Conversations
