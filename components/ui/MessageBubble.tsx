import React from 'react';
import { format } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';
import { Message } from '../../contexts/ChatContext';

interface MessageBubbleProps {
  message: Message;
  isLastInGroup: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  isLastInGroup 
}) => {
  const { user } = useAuth();
  const isOwnMessage = message.senderId === user?.id?.toString();
  
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-1`}>
      <div 
        className={`max-w-[75%] px-4 py-2 rounded-t-lg
          ${isOwnMessage 
            ? 'bg-sky-600 text-white rounded-l-lg' 
            : 'bg-gray-100 text-gray-800 rounded-r-lg'}
          ${isLastInGroup && isOwnMessage ? 'rounded-br-lg' : ''}
          ${isLastInGroup && !isOwnMessage ? 'rounded-bl-lg' : ''}
        `}
      >
        <p className="text-sm">{message.content}</p>
        <div className={`text-xs mt-1 ${isOwnMessage ? 'text-sky-100' : 'text-gray-500'} flex items-center`}>
          <span>
            {format(new Date(message.createdAt), 'HH:mm')}
          </span>
          {isOwnMessage && message.isRead && (
            <span className="ml-1">
              ✓✓
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

interface MessageGroupProps {
  messages: Message[];
}

export const MessageGroup: React.FC<MessageGroupProps> = ({ messages }) => {
  const groupedMessages = messages.reduce<{ [key: string]: Message[] }>((groups, message) => {
    const senderId = message.senderId;
    if (!groups[senderId]) {
      groups[senderId] = [];
    }
    groups[senderId].push(message);
    return groups;
  }, {});

  const sortedGroups = Object.values(groupedMessages)
    .map(group => [...group].sort((a, b) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    ));

  return (
    <div className="flex flex-col space-y-3">
      {sortedGroups.map(group => (
        <div key={group[0].id} className="flex flex-col">
          {group.map((message, idx) => (
            <MessageBubble 
              key={message.id} 
              message={message} 
              isLastInGroup={idx === group.length - 1} 
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MessageBubble;