import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { id, newPassword } = await request.json();
    if (!id || !newPassword || newPassword.length < 8) {
      return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 });
    }
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao resetar password:', error);
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
