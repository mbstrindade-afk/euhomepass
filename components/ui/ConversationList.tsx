import React from 'react';
import { format, isToday, isYesterday } from 'date-fns';
import { Conversation } from '../../contexts/ChatContext';

interface ConversationListItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
}

export const ConversationListItem: React.FC<ConversationListItemProps> = ({
  conversation,
  isSelected,
  onClick
}) => {
  const { otherUser, lastMessage, unreadCount } = conversation;

  // Format date for display
  const formatMessageDate = (date: Date) => {
    if (isToday(date)) {
      return format(date, 'HH:mm');
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      return format(date, 'dd/MM/yyyy');
    }
  };

  return (
    <div 
      className={`
        flex items-center p-3 cursor-pointer border-b border-gray-200 hover:bg-gray-50
        ${isSelected ? 'bg-sky-50' : ''}
        ${unreadCount > 0 ? 'bg-sky-50' : ''}
      `}
      onClick={onClick}
    >
      {/* User Avatar */}
      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold mr-3 flex-shrink-0">
        {otherUser.name ? otherUser.name.charAt(0).toUpperCase() : otherUser.email.charAt(0).toUpperCase()}
      </div>

      {/* Conversation Summary */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <h3 className="font-medium truncate">
            {otherUser.name || otherUser.email}
          </h3>
          <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
            {lastMessage ? formatMessageDate(new Date(lastMessage.createdAt)) : ''}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <p className={`text-sm truncate ${unreadCount > 0 ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
            {lastMessage ? lastMessage.content : 'No messages yet'}
          </p>
          {unreadCount > 0 && (
            <span className="bg-sky-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs ml-2 flex-shrink-0">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedConversationId,
  onSelectConversation
}) => {
  // Sort conversations by date (newest first)
  const sortedConversations = [...conversations].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <div className="h-full overflow-y-auto border-r border-gray-200 bg-white">
      {sortedConversations.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          <p>No conversations yet</p>
        </div>
      ) : (
        sortedConversations.map(conversation => (
          <ConversationListItem
            key={conversation.id}
            conversation={conversation}
            isSelected={selectedConversationId === conversation.id}
            onClick={() => onSelectConversation(conversation.id)}
          />
        ))
      )}
    </div>
  );
};

export default ConversationList;