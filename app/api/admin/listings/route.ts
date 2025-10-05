import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const listings = await prisma.listing.findMany();
  return NextResponse.json(listings);
}

export async function PATCH(req) {
  const { id, data } = await req.json();
  const listing = await prisma.listing.update({
    where: { id },
    data,
  });
  return NextResponse.json(listing);
}

export async function DELETE(req) {
  const { id } = await req.json();
  await prisma.listing.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
