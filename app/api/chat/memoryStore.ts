export interface MemoryMessage {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  isRead: boolean;
  readAt?: string;
}

export interface MemoryConversation {
  id: string;
  senderId: string;
  receiverId: string;
  listingId?: string;
  subject?: string;
  createdAt: string;
  updatedAt: string;
  messages: MemoryMessage[];
}

export interface MemoryUser {
  id: string;
  name: string;
  email: string;
}

const memoryConversations: MemoryConversation[] = [];
const memoryUsers = new Map<string, MemoryUser>();

const newId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export function ensureMemoryUser(id: string, name?: string | null, email?: string | null): MemoryUser {
  const safeName = name ?? `User ${id}`;
  const safeEmail = email ?? `${id}@example.com`;

  const existing = memoryUsers.get(id);
  if (existing) {
    const updated: MemoryUser = {
      id,
      name: name ?? existing.name,
      email: email ?? existing.email,
    };
    memoryUsers.set(id, updated);
    return updated;
  }

  const user: MemoryUser = { id, name: safeName, email: safeEmail };
  memoryUsers.set(id, user);
  return user;
}

export function findMemoryConversation(senderId: string, receiverId: string, listingId?: string) {
  return memoryConversations.find((conversation) => {
    const participantMatch =
      (conversation.senderId === senderId && conversation.receiverId === receiverId) ||
      (conversation.senderId === receiverId && conversation.receiverId === senderId);

    if (!participantMatch) return false;

    if (!listingId) {
      return !conversation.listingId;
    }

    return conversation.listingId === listingId;
  });
}

export function getMemoryConversationById(id: string) {
  return memoryConversations.find((conversation) => conversation.id === id);
}

export function createMemoryConversation(senderId: string, receiverId: string, listingId?: string) {
  const now = new Date().toISOString();
  const conversation: MemoryConversation = {
    id: newId('mem-conv'),
    senderId,
    receiverId,
    listingId,
    subject: listingId ? 'Property Inquiry' : undefined,
    createdAt: now,
    updatedAt: now,
    messages: [],
  };
  memoryConversations.push(conversation);
  return conversation;
}

export function addMemoryMessage(conversation: MemoryConversation, message: MemoryMessage) {
  conversation.messages.push(message);
  conversation.updatedAt = message.createdAt;
}

export function createMemoryMessage({
  conversationId,
  senderId,
  receiverId,
  content,
}: {
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
}) {
  const message: MemoryMessage = {
    id: newId('mem-msg'),
    conversationId,
    senderId,
    receiverId,
    content,
    createdAt: new Date().toISOString(),
    isRead: false,
  };

  const conversation = getMemoryConversationById(conversationId);
  if (conversation) {
    addMemoryMessage(conversation, message);
  }

  return message;
}

export function getMemoryConversationsForUser(userId: string) {
  return memoryConversations
    .filter((conversation) => conversation.senderId === userId || conversation.receiverId === userId)
    .map((conversation) => {
      const isCurrentUserSender = conversation.senderId === userId;
      const otherUserId = isCurrentUserSender ? conversation.receiverId : conversation.senderId;
      const otherUser = memoryUsers.get(otherUserId) ?? ensureMemoryUser(otherUserId);

      const unreadMessages = conversation.messages.filter(
        (message) => !message.isRead && message.receiverId === userId,
      );

      const lastMessage = conversation.messages.at(-1);

      return {
        id: conversation.id,
        senderId: conversation.senderId,
        receiverId: conversation.receiverId,
        listingId: conversation.listingId,
        subject: conversation.subject,
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
        otherUser,
        unreadCount: unreadMessages.length,
        lastMessage,
        messages: conversation.messages,
        listing: undefined,
      };
    });
}

export function getMemoryMessages(conversationId: string) {
  const conversation = getMemoryConversationById(conversationId);
  return conversation ? conversation.messages : [];
}

export function markMemoryMessagesRead(conversationId: string, receiverId: string) {
  const conversation = getMemoryConversationById(conversationId);
  if (!conversation) return;

  const now = new Date().toISOString();
  conversation.messages = conversation.messages.map((message) => {
    if (!message.isRead && message.receiverId === receiverId) {
      return { ...message, isRead: true, readAt: now };
    }
    return message;
  });
}
