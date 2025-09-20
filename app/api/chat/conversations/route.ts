import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '../../../../lib/jwt';
import {
  ensureMemoryUser,
  findMemoryConversation,
  createMemoryConversation,
  addMemoryMessage,
  getMemoryConversationsForUser,
} from '../memoryStore';

export const runtime = 'nodejs';

// GET /api/chat/conversations
export async function GET(request: NextRequest) {
  const authResult = await verifyAuth(request);

  if (!authResult.isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = authResult.userId;
  const userIdStr = userId?.toString();

  if (!userIdStr) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  ensureMemoryUser(userIdStr, authResult.email, authResult.email);
  const conversations = getMemoryConversationsForUser(userIdStr);
  return NextResponse.json({ conversations });
}

// POST /api/chat/conversations
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

  const { receiverId, listingId, initialMessage, receiver } = await request.json();

  if (!receiverId) {
    return NextResponse.json({ error: 'Receiver ID is required' }, { status: 400 });
  }

  ensureMemoryUser(userIdStr, authResult.email, authResult.email);
  ensureMemoryUser(receiverId, receiver?.name, receiver?.email);

  let conversation = findMemoryConversation(userIdStr, receiverId, listingId);

  if (!conversation) {
    conversation = createMemoryConversation(userIdStr, receiverId, listingId);
  }

  if (initialMessage) {
    addMemoryMessage(conversation, {
      id: `mem-msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      conversationId: conversation.id,
      senderId: userIdStr,
      receiverId,
      content: initialMessage,
      createdAt: new Date().toISOString(),
      isRead: false,
    });
  }

  return NextResponse.json(
    {
      message: 'Conversation stored in memory',
      conversationId: conversation.id,
    },
    { status: 201 },
  );
}
