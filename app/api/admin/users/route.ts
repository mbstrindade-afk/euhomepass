import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function PATCH(req) {
  const { id, data } = await req.json();
  const user = await prisma.user.update({
    where: { id },
    data,
  });
  return NextResponse.json(user);
}

export async function DELETE(req) {
  const { id } = await req.json();
  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
