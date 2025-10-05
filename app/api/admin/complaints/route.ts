import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const complaints = await prisma.complaint.findMany({ include: { user: true } });
  return NextResponse.json(complaints);
}

export async function PATCH(req) {
  const { id, data } = await req.json();
  const complaint = await prisma.complaint.update({
    where: { id },
    data,
  });
  return NextResponse.json(complaint);
}
