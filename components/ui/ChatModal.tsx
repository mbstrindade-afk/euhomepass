import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useChat, Conversation } from '../../contexts/ChatContext';
import ChatWindow from './ChatWindow';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversationId?: string;
  initialReceiverId?: string;
  initialListingId?: string;
  initialMessage?: string;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  onClose,
  conversationId,
  initialReceiverId,
  initialListingId,
  initialMessage,
}) => {
  const { conversations, startNewConversation, isLoading } = useChat();
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [hasCreated, setHasCreated] = useState(false);
  const [pendingConversationId, setPendingConversationId] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setActiveConversation(null);
      setHasCreated(false);
      setPendingConversationId(null);
      return;
    }

    if (conversationId) {
      const conversation = conversations.find((c) => c.id === conversationId);
      if (conversation) {
        setActiveConversation(conversation);
      }
      return;
    }

    if (pendingConversationId) {
      const conversation = conversations.find((c) => c.id === pendingConversationId);
      if (conversation) {
        setActiveConversation(conversation);
        setPendingConversationId(null);
      }
    }

    if (!initialReceiverId || hasCreated) {
      return;
    }

    setIsCreating(true);
    setHasCreated(true);

    (async () => {
      try {
        const newConversationId = await startNewConversation(
          initialReceiverId,
          initialListingId,
          initialMessage,
        );

        if (newConversationId) {
          setPendingConversationId(newConversationId);
        }
      } catch (error) {
        console.error('Failed to create conversation:', error);
      } finally {
        setIsCreating(false);
      }
    })();
  }, [
    isOpen,
    conversationId,
    initialReceiverId,
    initialListingId,
    initialMessage,
    conversations,
    startNewConversation,
    hasCreated,
    pendingConversationId,
  ]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-40 transition-opacity"
          onClick={onClose}
        ></div>

        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl h-[80vh] z-10">
          {isCreating || isLoading ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
                <p className="mt-2">Opening conversation...</p>
              </div>
            </div>
          ) : activeConversation ? (
            <ChatWindow conversation={activeConversation} onClose={onClose} isModal />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">No conversation found</h3>
                <p className="text-gray-600">There was an error loading the conversation.</p>
                <button
                  onClick={onClose}
                  className="mt-4 bg-sky-600 hover:bg-sky-700 text-white py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ChatModal;
