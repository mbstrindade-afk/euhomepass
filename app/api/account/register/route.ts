import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { name, email, passType, referralCode, password } = await req.json();
  const code = nanoid(8);

  let referredById: string | undefined = undefined;
  if (referralCode) {
    const referrer = await prisma.user.findUnique({ where: { referralCode } });
    if (referrer) {
      referredById = referrer.id;
    }
  }

  // Create user with referral
  const user = await prisma.user.create({
    data: {
      name,
      email,
      passType,
      referralCode: code,
      password,
      ...(referredById ? { referredBy: { connect: { id: referredById } } } : {}),
    },
  });

  return NextResponse.json({ message: 'User registered', referralCode: code });
}
