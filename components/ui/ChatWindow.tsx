import React, { useState, useRef, useEffect } from 'react';
import { useChat, Conversation, Message } from '../../contexts/ChatContext';
import { useAuth } from '../../contexts/AuthContext';
import { MessageBubble } from './MessageBubble';
import { format } from 'date-fns';

interface ChatWindowProps {
  conversation: Conversation;
  onClose?: () => void;
  isModal?: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ 
  conversation, 
  onClose,
  isModal = false
}) => {
  const { user } = useAuth();
  const { sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const otherUser = conversation.otherUser;
  
  // Scroll to bottom when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !user) return;
    
    setIsLoading(true);
    
    try {
      await sendMessage(conversation.id, newMessage);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Group messages by date for better readability
  const messagesByDate = conversation.messages.reduce<{ [date: string]: Message[] }>((groups, message) => {
    const date = format(new Date(message.createdAt), 'yyyy-MM-dd');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});
  
  return (
    <div className={`flex flex-col ${isModal ? 'h-full' : 'h-[calc(100vh-16rem)]'} bg-white rounded-lg shadow-md overflow-hidden`}>
      {/* Header */}
      <div className="bg-sky-700 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-sky-300 flex items-center justify-center text-sky-700 font-bold mr-3">
            {otherUser.name ? otherUser.name.charAt(0).toUpperCase() : otherUser.email.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-medium">
              {otherUser.name || otherUser.email}
            </h3>
            {conversation.listing && (
              <p className="text-xs text-sky-100">
                Re: {conversation.listing.title}
              </p>
            )}
          </div>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="text-white hover:text-sky-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {Object.entries(messagesByDate).map(([date, messages]) => (
          <div key={date} className="mb-6">
            <div className="flex justify-center mb-4">
              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                {format(new Date(date), 'MMMM d, yyyy')}
              </span>
            </div>
            
            {messages.map((message, index) => (
              <MessageBubble 
                key={message.id} 
                message={message} 
                isLastInGroup={
                  index === messages.length - 1 || 
                  messages[index + 1]?.senderId !== message.senderId
                } 
              />
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area */}
      <form 
        onSubmit={handleSendMessage}
        className="border-t border-gray-200 p-4 bg-white"
      >
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`bg-sky-600 hover:bg-sky-700 text-white rounded-r-lg py-2 px-4 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading || !newMessage.trim()}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending
              </span>
            ) : (
              'Send'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;