'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import { useChat } from '../../../contexts/ChatContext';
import ConversationList from '../../../components/ui/ConversationList';
import ChatWindow from '../../../components/ui/ChatWindow';
import Header from '../../../components/Header';

export default function InboxPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { 
    conversations, 
    currentConversation, 
    selectConversation, 
    refreshConversations,
    isLoading: chatLoading,
    error 
  } = useChat();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  // Fetch conversations when the component mounts
  useEffect(() => {
    if (isAuthenticated) {
      refreshConversations();
    }
  }, [isAuthenticated, refreshConversations]);

  // Handle conversation selection
  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    selectConversation(conversationId);
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?redirect=/inbox');
    }
  }, [authLoading, isAuthenticated, router]);

  // Get the currently selected conversation
  const activeConversation = conversations.find(c => c.id === selectedConversationId);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto pt-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Inbox</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {chatLoading && conversations.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md h-[calc(100vh-16rem)] flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
                <p className="mt-2">Loading conversations...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-6 h-[calc(100vh-16rem)]">
              {/* Conversations List */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-sky-700 text-white">
                  <h2 className="font-semibold">Messages</h2>
                </div>
                <ConversationList
                  conversations={conversations}
                  selectedConversationId={selectedConversationId}
                  onSelectConversation={handleSelectConversation}
                />
              </div>

              {/* Chat Window */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {activeConversation ? (
                  <ChatWindow conversation={activeConversation} />
                ) : (
                  <div className="h-full flex items-center justify-center p-8">
                    <div className="text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <h3 className="text-xl font-medium text-gray-700 mb-2">No conversation selected</h3>
                      <p className="text-gray-500">Select a conversation from the list or start a new one by messaging a host</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}