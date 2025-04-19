import { create } from "zustand"



interface ConversatationState {
  selectedConversation: ConversationType | null
  messages: MessageType[]
  setSelectedConversation: (conversation: ConversationType | null) => void
  setMessages: (messages: MessageType[]) => void
}

const useConversationStore = create<ConversatationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }),
  messages: [],
  setMessages: (messages) => set({ messages: messages }),
}))

export default useConversationStore
