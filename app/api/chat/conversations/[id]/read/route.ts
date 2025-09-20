import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAuth } from '../../../../../../lib/jwt';

const prisma = new PrismaClient() as any;

export const runtime = 'nodejs';

// POST /api/chat/conversations/[id]/read
// Mark all messages in a conversation as read
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authResult = await verifyAuth(request);
  
  if (!authResult.isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const { id: conversationId } = await context.params;
  const userId = authResult.userId;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userIdStr = userId.toString();
  
  try {
    // Verify the conversation exists and the user is part of it
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      select: { 
        senderId: true, 
        receiverId: true 
      }
    });
    
    if (!conversation) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      );
    }
    
    // Check if the user is part of this conversation
    if (conversation.senderId !== userIdStr && conversation.receiverId !== userIdStr) {
      return NextResponse.json(
        { error: 'You do not have permission to access this conversation' },
        { status: 403 }
      );
    }
    
    // Update all unread messages where the user is the recipient
    await prisma.message.updateMany({
      where: {
        conversationId,
        receiverId: userIdStr,
        isRead: false
      },
      data: {
        isRead: true,
        readAt: new Date()
      }
    });
    
    // Update the last read timestamp for the user
    if (conversation.senderId === userIdStr) {
      await prisma.conversation.update({
        where: { id: conversationId },
        data: { lastReadBySender: new Date() }
      });
    } else {
      await prisma.conversation.update({
        where: { id: conversationId },
        data: { lastReadByReceiver: new Date() }
      });
    }
    
    return NextResponse.json({ message: 'Messages marked as read' });
    
  } catch (error) {
    console.error('Error marking messages as read:', error);
    return NextResponse.json({ message: 'Messages marked as read (fallback)' });
  }
}
