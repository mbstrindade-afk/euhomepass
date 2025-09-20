'use client';

import React, { useState, useEffect } from 'react';
import { FiMessageSquare } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { useChat } from '../../contexts/ChatContext';

// Mock listing data type
interface Listing {
  id: string;
  title: string;
  location: string;
  price: number;
  imageUrl: string;
  hostId: string;
  hostName: string;
}

// Mock data
const mockListing: Listing = {
  id: 'listing-123',
  title: 'Beautiful Apartment in Lisbon City Center',
  location: 'Lisbon, Portugal',
  price: 85,
  imageUrl: '/home.svg',
  hostId: 'host-123',
  hostName: 'Maria Santos'
};

export default function MessageHostButton() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { startNewConversation, selectConversation } = useChat();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openModal = () => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/listing');
      return;
    }
    setError(null);
    setIsModalOpen(true);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const conversationId = await startNewConversation(
        mockListing.hostId,
        mockListing.id,
        trimmedMessage,
        {
          name: mockListing.hostName,
          email: `${mockListing.hostId}@example.com`,
        }
      );

      if (!conversationId) {
        setError('Unable to start conversation. Please try again.');
        return;
      }

      setMessage('');
      setIsModalOpen(false);
      selectConversation(conversationId);
      router.push('/messages');
    } catch (err) {
      console.error('Failed to send message to host', err);
      setError('Could not send your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
      <button
        onClick={openModal}
        className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <FiMessageSquare size={18} />
        Message Host
      </button>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full shadow-xl overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Message Host</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-bold">
                    {mockListing.hostName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium">{mockListing.hostName}</h3>
                    <p className="text-sm text-gray-500">Host</p>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">{mockListing.title}</p>
                  <p className="text-sm text-gray-600">{mockListing.location}</p>
                  <p className="text-sm font-medium mt-2">{`€${mockListing.price} per night`}</p>
                </div>
              </div>
              
              {error && (
                <div className="mb-4 rounded bg-red-100 px-3 py-2 text-sm text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSendMessage}>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your message to {mockListing.hostName}
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 h-32 resize-none p-3"
                    placeholder="Hi, I'm interested in your property..."
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    disabled={!message.trim() || isSubmitting}
                    className={`bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg ${
                      !message.trim() || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}