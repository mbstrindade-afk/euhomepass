import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@homepass.com';
  const password = 'admin123'; // Troque para uma senha segura depois
  const name = 'Admin User';

  // Verifica se já existe
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log('Utilizador admin já existe:', email);
    return;
  }

  const user = await prisma.user.create({
    data: {
      email,
      password,
      name,
      isAdmin: true,
      referralCode: 'ADMIN-' + Math.random().toString(36).substring(2, 10),
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
