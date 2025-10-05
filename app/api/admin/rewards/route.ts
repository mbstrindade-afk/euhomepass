import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const rewards = await prisma.reward.findMany({ include: { user: true } });
  return NextResponse.json(rewards);
}

export async function PATCH(req) {
  const { id, data } = await req.json();
  const reward = await prisma.reward.update({
    where: { id },
    data,
  });
  return NextResponse.json(reward);
}
