import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const passes = await prisma.pass.findMany({ include: { user: true } });
  return NextResponse.json(passes);
}

export async function PATCH(req) {
  const { id, data } = await req.json();
  const pass = await prisma.pass.update({
    where: { id },
    data,
  });
  return NextResponse.json(pass);
}
