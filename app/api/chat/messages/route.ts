import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAuth } from '../../../../lib/jwt';

const prisma = new PrismaClient() as any;

export const runtime = 'nodejs';

// GET /api/chat/messages
// Get messages for a specific conversation
export async function GET(request: NextRequest) {
  const authResult = await verifyAuth(request);
  
  if (!authResult.isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const url = new URL(request.url);
  const conversationId = url.searchParams.get('conversationId');
  
  if (!conversationId) {
    return NextResponse.json(
      { error: 'Conversation ID is required' },
      { status: 400 }
    );
  }
  
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
    
    // Get messages for the conversation
    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
    });
    
    // Mark messages as read if the user is the recipient
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
    
    return NextResponse.json({ messages });
    
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ messages: [] });
  }
}

// POST /api/chat/messages
// Send a new message
export async function POST(request: NextRequest) {
  const authResult = await verifyAuth(request);
  
  if (!authResult.isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const userId = authResult.userId;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userIdStr = userId.toString();
    const { conversationId, content } = await request.json();
    
    // Validate request body
    if (!conversationId || !content) {
      return NextResponse.json(
        { error: 'Conversation ID and content are required' },
        { status: 400 }
      );
    }
    
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
        { error: 'You do not have permission to send messages in this conversation' },
        { status: 403 }
      );
    }
    
    // Determine the recipient based on who the sender is
    const recipientId = conversation.senderId === userIdStr
      ? conversation.receiverId
      : conversation.senderId;
    
    // Create the new message
    const newMessage = await prisma.message.create({
      data: {
        conversationId,
        senderId: userIdStr,
        receiverId: recipientId,
        content
      }
    });
    
    // Update the conversation's last updated timestamp
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() }
    });
    
    return NextResponse.json(
      { message: 'Message sent successfully', data: newMessage },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { message: 'Message delivery fallback', data: null },
      { status: 200 }
    );
  }
}
