import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { userId, title, message } = await req.json();
  if (!userId || !title || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const complaint = await prisma.complaint.create({
    data: {
      userId,
      title,
      message,
    },
  });

  return NextResponse.json({ message: 'Complaint submitted', complaint });
}
