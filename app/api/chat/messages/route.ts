import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '../../../../lib/jwt';
import {
  ensureMemoryUser,
  getMemoryConversationById,
  getMemoryMessages,
  createMemoryMessage,
  markMemoryMessagesRead,
} from '../memoryStore';

export const runtime = 'nodejs';

// GET /api/chat/messages
export async function GET(request: NextRequest) {
  const authResult = await verifyAuth(request);

  if (!authResult.isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(request.url);
  const conversationId = url.searchParams.get('conversationId');

  if (!conversationId) {
    return NextResponse.json({ error: 'Conversation ID is required' }, { status: 400 });
  }

  const userId = authResult.userId;
  const userIdStr = userId?.toString();

  if (!userIdStr) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  ensureMemoryUser(userIdStr, authResult.email, authResult.email);

  const conversation = getMemoryConversationById(conversationId);

  if (!conversation) {
    return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
  }

  if (conversation.senderId !== userIdStr && conversation.receiverId !== userIdStr) {
    return NextResponse.json(
      { error: 'You do not have permission to access this conversation' },
      { status: 403 },
    );
  }

  const messages = getMemoryMessages(conversationId);
  markMemoryMessagesRead(conversationId, userIdStr);

  return NextResponse.json({ messages });
}

// POST /api/chat/messages
export async function POST(request: NextRequest) {
  const authResult = await verifyAuth(request);

  if (!authResult.isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = authResult.userId;
  const userIdStr = userId?.toString();

  if (!userIdStr) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { conversationId, content } = await request.json();

  if (!conversationId || !content) {
    return NextResponse.json({ error: 'Conversation ID and content are required' }, { status: 400 });
  }

  ensureMemoryUser(userIdStr, authResult.email, authResult.email);

  const conversation = getMemoryConversationById(conversationId);

  if (!conversation) {
    return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
  }

  if (conversation.senderId !== userIdStr && conversation.receiverId !== userIdStr) {
    return NextResponse.json(
      { error: 'You do not have permission to send messages in this conversation' },
      { status: 403 },
    );
  }

  const recipientId = conversation.senderId === userIdStr ? conversation.receiverId : conversation.senderId;
  const message = createMemoryMessage({
    conversationId,
    senderId: userIdStr,
    receiverId: recipientId,
    content,
  });

  return NextResponse.json(
    { message: 'Message stored in memory', data: message },
    { status: 201 },
  );
}
