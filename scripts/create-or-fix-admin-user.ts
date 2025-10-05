import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@homepass.com';
  const password = 'admin123';
  const name = 'Admin User';
  const referralCode = 'ADMIN-' + Math.random().toString(36).substring(2, 10);

  // Hash da password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Verifica se já existe
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword, isAdmin: true },
    });
    console.log('Utilizador admin atualizado:', email);
    return;
  }

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      isAdmin: true,
      referralCode,
    },
  });
  console.log('Utilizador admin criado:', user);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(() => {
  prisma.$disconnect();
});
