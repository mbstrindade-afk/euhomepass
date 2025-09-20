import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

// Types
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: Date;
  isRead: boolean;
  readAt?: Date;
}

export interface Conversation {
  id: string;
  senderId: string;
  receiverId: string;
  listingId?: string;
  subject?: string;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
  unreadCount: number;
  lastMessage?: Message;
  otherUser: {
    id: string;
    name?: string;
    email: string;
  };
  listing?: {
    id: string;
    title?: string;
    images?: string[];
  };
}

interface ChatContextType {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  isLoading: boolean;
  error: string | null;
  sendMessage: (conversationId: string, content: string) => Promise<void>;
  startNewConversation: (receiverId: string, listingId?: string, initialMessage?: string) => Promise<string | null>;
  selectConversation: (conversationId: string) => void;
  markAsRead: (conversationId: string) => Promise<void>;
  refreshConversations: () => Promise<void>;
  unreadCount: number;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch user's conversations when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      refreshConversations();
    }
  }, [isAuthenticated, user]);

  // Calculate unread count whenever conversations change
  useEffect(() => {
    const count = conversations.reduce((total, conv) => {
      return total + conv.unreadCount;
    }, 0);
    setUnreadCount(count);
  }, [conversations]);

  // Fetch all conversations for the current user
  const refreshConversations = async (): Promise<void> => {
    if (!isAuthenticated || !user) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/chat/conversations');
      
      if (!response.ok) {
        throw new Error('Failed to fetch conversations');
      }
      
      const data = await response.json();
      setConversations(data.conversations);
      
      // If there's a current conversation, refresh it with updated data
      if (currentConversation) {
        const updated = data.conversations.find(
          (c: Conversation) => c.id === currentConversation.id
        );
        if (updated) {
          setCurrentConversation(updated);
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Send a message in an existing conversation
  const sendMessage = async (conversationId: string, content: string): Promise<void> => {
    if (!isAuthenticated || !user) {
      setError('You must be logged in to send messages');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/chat/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ conversationId, content }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }
      
      // Refresh the conversation to include the new message
      await refreshConversations();
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Start a new conversation with another user
  const startNewConversation = async (
    receiverId: string,
    listingId?: string,
    initialMessage?: string
  ): Promise<string | null> => {
    if (!isAuthenticated || !user) {
      setError('You must be logged in to start a conversation');
      return null;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/chat/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receiverId,
          listingId,
          initialMessage,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to start conversation');
      }
      
      const data = await response.json();
      
      // Refresh conversations to include the new one
      await refreshConversations();
      
      // Return the ID of the new conversation
      return data.conversationId;
      
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Select a conversation to view
  const selectConversation = async (conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      setCurrentConversation(conversation);
      
      // Mark as read when selecting
      if (conversation.unreadCount > 0) {
        await markAsRead(conversationId);
      }
    }
  };

  // Mark a conversation as read
  const markAsRead = async (conversationId: string): Promise<void> => {
    if (!isAuthenticated || !user) return;
    
    try {
      const response = await fetch(`/api/chat/conversations/${conversationId}/read`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to mark conversation as read');
      }
      
      // Update local state to reflect read status
      setConversations(prevConversations => 
        prevConversations.map(conv => {
          if (conv.id === conversationId) {
            return {
              ...conv,
              unreadCount: 0,
              messages: conv.messages.map(msg => ({
                ...msg,
                isRead: true,
                readAt: msg.readAt || new Date()
              }))
            };
          }
          return conv;
        })
      );
      
      if (currentConversation?.id === conversationId) {
        setCurrentConversation(prev => {
          if (!prev) return null;
          return {
            ...prev,
            unreadCount: 0,
            messages: prev.messages.map(msg => ({
              ...msg,
              isRead: true,
              readAt: msg.readAt || new Date()
            }))
          };
        });
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const value = {
    conversations,
    currentConversation,
    isLoading,
    error,
    sendMessage,
    startNewConversation,
    selectConversation,
    markAsRead,
    refreshConversations,
    unreadCount,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
