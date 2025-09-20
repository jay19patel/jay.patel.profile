'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, User, Bot } from 'lucide-react'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      // Add a welcome message when opening
      setMessages([{ sender: 'bot', text: "Hi! I'm Jay Patel. How can I help you today?" }])
    } else {
        setMessages([])
        setInputValue('')
    }
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (inputValue.trim() === '') return

    const newMessages = [...messages, { sender: 'user', text: inputValue }]
    setMessages(newMessages)
    setInputValue('')

    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: "This service is under construction. Sorry for any inconvenience." }])
    }, 1000)
  }

  return (
    <>
      {/* Chat Bubble Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-8 right-8 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 px-4 py-3 rounded-full shadow-lg hover:shadow-xl group flex items-center gap-2 transition-all duration-300 z-50 transform hover:scale-110"
        aria-label="Toggle Chat"
      >
              <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Chat with Jay</span>
      </button>


      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-8 w-80 md:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-50 transition-all duration-500 ease-in-out transform ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-t-2xl border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Chat with Jay</h3>
          </div>
          <button 
            onClick={toggleChat} 
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="p-4 h-80 overflow-y-auto space-y-4 bg-gray-50 dark:bg-gray-900">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
                msg.sender === 'user' 
                  ? 'bg-gray-600 text-white' 
                  : 'bg-blue-600 text-white'
              }`}>
                {msg.sender === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 p-2.5 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!inputValue.trim()}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ChatBot 