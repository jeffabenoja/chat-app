import { Send } from "lucide-react"
import useSendMessages from "../../hooks/useSendMessages"
import { useState, useRef, useEffect } from "react"

const MessageInput = () => {
  const [message, setMessage] = useState("")
  const { sendMessage, loading } = useSendMessages()
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await sendMessage(message)

    if (!message.trim()) return

    if (success) {
      setMessage("")
    }
  }

  const handleInput = () => {
    const textarea = textareaRef.current

    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
    }
  }

  useEffect(() => {
    handleInput()
  }, [message])

  return (
    <form className='px-4 mb-3' onSubmit={handleSubmit}>
      <div className='w-full flex bg-gray-700 border border-gray-600 rounded-lg'>
        <textarea
          ref={textareaRef}
          className='overflow-hidden border-none text-sm rounded-lg p-2 bg-transparent text-white outline-none resize-none flex-1'
          placeholder='Send a message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={1} // Minimum row count
          style={{ minHeight: "40px", maxHeight: "120px" }}
          onInput={handleInput}
        />
        <button type='submit' className='flex items-end pb-2 pe-3'>
          {loading ? (
            <div className='w-5 h-5 border-2 border-t-transparent border-gray-700 rounded-full animate-spin'></div>
          ) : (
            <Send className='w-6 h-6 text-white' />
          )}
        </button>
      </div>
    </form>
  )
}
export default MessageInput
