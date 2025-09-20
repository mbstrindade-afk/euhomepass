'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { format } from 'date-fns';
import { FiSend, FiPaperclip, FiSmile, FiUser, FiChevronLeft, FiSearch } from 'react-icons/fi';

// Mock conversations
const mockConversations = [
  {
    id: '1',
    otherUser: {
      id: 'host-123',
      name: 'Maria',
      email: 'maria@example.com',
    },
    lastMessage: {
      content: 'Hi, I\'m interested in your property in Lisbon!',
      createdAt: new Date(2025, 8, 15, 14, 30),
      senderId: 'user-1',
    },
    unreadCount: 2,
  },
  {
    id: '2',
    otherUser: {
      id: 'host-456',
      name: 'João',
      email: 'joao@example.com',
    },
    lastMessage: {
      content: 'Is the apartment still available for October?',
      createdAt: new Date(2025, 8, 16, 10, 15),
      senderId: 'host-456',
    },
    unreadCount: 0,
  },
  {
    id: '3',
    otherUser: {
      id: 'host-789',
      name: 'Ana',
      email: 'ana@example.com',
    },
    lastMessage: {
      content: 'Thank you for your inquiry! Yes, the house has high-speed internet.',
      createdAt: new Date(2025, 8, 17, 9, 45),
      senderId: 'host-789',
    },
    unreadCount: 1,
  },
];

// Mock messages
const mockMessages = {
  '1': [
    {
      id: 'm1',
      content: 'Hi, I\'m interested in your property in Lisbon!',
      createdAt: new Date(2025, 8, 15, 14, 30),
      senderId: 'user-1',
      receiverId: 'host-123',
      isRead: true,
    },
    {
      id: 'm2',
      content: 'Hello! Thank you for your interest. What specific dates are you looking for?',
      createdAt: new Date(2025, 8, 15, 15, 45),
      senderId: 'host-123',
      receiverId: 'user-1',
      isRead: false,
    },
    {
      id: 'm3',
      content: 'I\'m planning to visit Lisbon from October 15th to November 10th.',
      createdAt: new Date(2025, 8, 15, 16, 10),
      senderId: 'user-1',
      receiverId: 'host-123',
      isRead: true,
    },
    {
      id: 'm4',
      content: 'Great! The apartment is available during that period. Would you like to know more details about the place?',
      createdAt: new Date(2025, 8, 16, 9, 25),
      senderId: 'host-123',
      receiverId: 'user-1',
      isRead: false,
    },
  ],
  '2': [
    {
      id: 'm5',
      content: 'Is the apartment still available for October?',
      createdAt: new Date(2025, 8, 16, 10, 15),
      senderId: 'user-1',
      receiverId: 'host-456',
      isRead: true,
    },
    {
      id: 'm6',
      content: 'Yes, it\'s available. Would you like to book it?',
      createdAt: new Date(2025, 8, 16, 11, 30),
      senderId: 'host-456',
      receiverId: 'user-1',
      isRead: true,
    },
  ],
  '3': [
    {
      id: 'm7',
      content: 'Does your house have a good internet connection? I need to work remotely.',
      createdAt: new Date(2025, 8, 17, 9, 20),
      senderId: 'user-1',
      receiverId: 'host-789',
      isRead: true,
    },
    {
      id: 'm8',
      content: 'Thank you for your inquiry! Yes, the house has high-speed internet.',
      createdAt: new Date(2025, 8, 17, 9, 45),
      senderId: 'host-789',
      receiverId: 'user-1',
      isRead: false,
    },
  ],
};

export default function MessengerPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState(mockConversations);
  const [messages, setMessages] = useState<{[key: string]: any[]}>(mockMessages);
  
  // Format timestamp for messages and conversations
  const formatMessageTime = (date: Date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.getTime() > today.getTime()) {
      // Today
      return format(date, 'HH:mm');
    } else if (date.getTime() > yesterday.getTime()) {
      // Yesterday
      return 'Yesterday';
    } else {
      // Earlier
      return format(date, 'dd/MM/yyyy');
    }
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !selectedConversation) return;
    
    const newMessage = {
      id: `m${Date.now()}`,
      content: message,
      createdAt: new Date(),
      senderId: 'user-1',
      receiverId: conversations.find(c => c.id === selectedConversation)?.otherUser.id || '',
      isRead: false,
    };
    
    // Update messages
    setMessages(prev => ({
      ...prev,
      [selectedConversation]: [...(prev[selectedConversation] || []), newMessage],
    }));
    
    // Update conversation last message
    setConversations(prev => 
      prev.map(conv => 
        conv.id === selectedConversation 
          ? {
              ...conv,
              lastMessage: {
                content: message,
                createdAt: new Date(),
                senderId: 'user-1',
              },
            }
          : conv
      )
    );
    
    // Clear input
    setMessage('');
  };
  
  // Mark messages as read when conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      setConversations(prev => 
        prev.map(conv => 
          conv.id === selectedConversation 
            ? { ...conv, unreadCount: 0 }
            : conv
        )
      );
    }
  }, [selectedConversation]);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (selectedConversation) {
      const messagesContainer = document.getElementById('messages-container');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }
  }, [selectedConversation, messages]);
  
  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>Messages | HomePass</title>
      </Head>
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/loguinho.png" alt="HomePass" className="w-24 h-auto" />
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Welcome, Guest</span>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Conversation List */}
        <div className="w-80 border-r border-gray-200 flex flex-col bg-white">
          <div className="p-4 border-b border-gray-200">
            <h1 className="font-bold text-2xl">Messages</h1>
          </div>
          
          {/* Search */}
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations"
                className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>
          </div>
          
          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-3 flex items-center cursor-pointer border-b border-gray-100 hover:bg-gray-50 ${
                  selectedConversation === conversation.id ? 'bg-sky-50' : ''
                }`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-bold mr-3">
                  {conversation.otherUser.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-medium truncate">
                      {conversation.otherUser.name}
                    </h3>
                    <span className="text-xs text-gray-500 ml-2">
                      {conversation.lastMessage 
                        ? formatMessageTime(conversation.lastMessage.createdAt) 
                        : ''}
                    </span>
                  </div>
                  <p className={`text-sm truncate ${
                    conversation.unreadCount > 0 ? 'font-semibold text-gray-900' : 'text-gray-500'
                  }`}>
                    {conversation.lastMessage?.content || 'No messages yet'}
                  </p>
                </div>
                {conversation.unreadCount > 0 && (
                  <div className="ml-2 bg-sky-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                    {conversation.unreadCount}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center bg-white">
                <button 
                  className="md:hidden mr-3 text-gray-500"
                  onClick={() => setSelectedConversation(null)}
                >
                  <FiChevronLeft size={20} />
                </button>
                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-bold mr-3">
                  {conversations.find(c => c.id === selectedConversation)?.otherUser.name.charAt(0)}
                </div>
                <div>
                  <h2 className="font-medium">
                    {conversations.find(c => c.id === selectedConversation)?.otherUser.name}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {conversations.find(c => c.id === selectedConversation)?.otherUser.email}
                  </p>
                </div>
              </div>
              
              {/* Messages */}
              <div 
                id="messages-container"
                className="flex-1 overflow-y-auto p-4 bg-gray-50"
              >
                <div className="max-w-3xl mx-auto space-y-4">
                  {messages[selectedConversation]?.map((msg) => {
                    const isUser = msg.senderId === 'user-1';
                    return (
                      <div 
                        key={msg.id} 
                        className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-t-lg p-3 ${
                            isUser
                              ? 'bg-sky-600 text-white rounded-l-lg'
                              : 'bg-gray-100 text-gray-900 rounded-r-lg'
                          }`}
                        >
                          <p>{msg.content}</p>
                          <div className={`text-xs mt-1 ${isUser ? 'text-sky-100' : 'text-gray-500'} text-right`}>
                            {format(new Date(msg.createdAt), 'HH:mm')}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <button type="button" className="text-gray-500 hover:text-gray-700">
                    <FiPaperclip />
                  </button>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-100 rounded-full py-2 px-4 focus:outline-none"
                  />
                  <button 
                    type="button" 
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiSmile />
                  </button>
                  <button
                    type="submit"
                    disabled={!message.trim()}
                    className={`bg-sky-600 hover:bg-sky-700 text-white rounded-full p-2 ${
                      !message.trim() ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <FiSend />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center p-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiUser size={36} className="text-gray-500" />
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">Your Messages</h3>
                <p className="text-gray-500 max-w-md">
                  Select a conversation from the list to view messages or start a new conversation by messaging a host.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}