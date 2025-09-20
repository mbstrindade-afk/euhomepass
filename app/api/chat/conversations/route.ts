import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAuth } from '../../../../lib/jwt';

const prisma = new PrismaClient() as any;

export const runtime = 'nodejs';

// GET /api/chat/conversations
// Get all conversations for the current user
export async function GET(request: NextRequest) {
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
    
    // Find all conversations where the user is either sender or receiver
    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [
          { senderId: userIdStr },
          { receiverId: userIdStr }
        ]
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        receiver: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        listing: {
          select: {
            id: true,
            title: true,
            images: true
          }
        },
        messages: {
          orderBy: {
            createdAt: 'asc'
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });
    
    // Transform data to include unreadCount and lastMessage
    const transformedConversations = conversations.map((conversation: any) => {
      const isCurrentUserSender = conversation.senderId === userIdStr;
      const otherUser = isCurrentUserSender ? conversation.receiver : conversation.sender;
      
      // Calculate unread messages for the current user
      const unreadMessages = conversation.messages.filter((msg: any) => 
        msg.isRead === false && 
        msg.receiverId === userIdStr
      );
      
      // Get the last message
      const lastMessage = conversation.messages.length > 0 
        ? conversation.messages[conversation.messages.length - 1] 
        : undefined;
      
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
        listing: conversation.listing
      };
    });
    
    return NextResponse.json({ conversations: transformedConversations });
    
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json({ conversations: [] });
  }
}

// POST /api/chat/conversations
// Start a new conversation
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

    const { receiverId, listingId, initialMessage } = await request.json();
    
    // Validate request body
    if (!receiverId) {
      return NextResponse.json(
        { error: 'Receiver ID is required' },
        { status: 400 }
      );
    }
    
    // Check if conversation already exists between these users (and optionally for this listing)
    let conversation = await prisma.conversation.findFirst({
      where: {
        OR: [
          {
            senderId: userIdStr,
            receiverId: receiverId,
            ...(listingId && { listingId })
          },
          {
            senderId: receiverId,
            receiverId: userIdStr,
            ...(listingId && { listingId })
          }
        ]
      }
    });
    
    // If no existing conversation, create a new one
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          senderId: userIdStr,
          receiverId: receiverId,
          ...(listingId && { listingId }),
          subject: listingId ? 'Property Inquiry' : undefined
        }
      });
    }
    
    // If there's an initial message, add it to the conversation
    if (initialMessage) {
      await prisma.message.create({
        data: {
          conversationId: conversation.id,
          senderId: userIdStr,
          receiverId: receiverId,
          content: initialMessage
        }
      });
    }
    
    return NextResponse.json(
      { 
        message: 'Conversation started successfully',
        conversationId: conversation.id
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error starting conversation:', error);
    return NextResponse.json(
      { message: 'Conversation fallback response', conversationId: null },
      { status: 200 }
    );
  }
}
