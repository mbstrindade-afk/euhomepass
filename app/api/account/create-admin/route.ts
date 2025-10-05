import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST() {
	const email = 'euhomepass-admin@hotmail.com';
	const password = 'euhomepass2025admin';

	// Verifica se já existe
	const existing = await prisma.user.findUnique({ where: { email } });
	if (existing) {
		return NextResponse.json({ error: 'Admin já existe.' }, { status: 400 });
	}

	const admin = await prisma.user.create({
		data: {
			email,
			password,
			name: 'Administrador HomePass',
			isAdmin: true,
			referralCode: 'admin2025',
		},
	});

	return NextResponse.json({ message: 'Admin criado com sucesso!', admin });
}
