// Script para popular dados demo nas tabelas Complaint, Pass e Reward
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedDemoData() {
  // Usuário padrão para associação
  const user = await prisma.user.upsert({
    where: { email: "mockhost@homepass.com" },
    update: {},
    create: {
      email: "mockhost@homepass.com",
      password: "mockpass",
      name: "Mock Host",
      referralCode: "mockhost2025"
    }
  });


  // Complaints
  await prisma.complaint.createMany({
    data: [
      { userId: user.id, title: "Barulho", message: "Barulho excessivo no apartamento.", status: "open" },
      { userId: user.id, title: "Aquecimento", message: "Problema com aquecimento.", status: "resolved" },
      { userId: user.id, title: "Limpeza", message: "Falta de limpeza na entrada.", status: "open" }
    ]
  });

  // Passes
  await prisma.pass.createMany({
    data: [
      { userId: user.id, type: "Gold", startDate: new Date("2025-01-01"), endDate: new Date("2025-12-31"), pricePaid: 100 },
      { userId: user.id, type: "Silver", startDate: new Date("2025-01-01"), endDate: new Date("2025-06-30"), pricePaid: 50 }
    ]
  });

  // Rewards
  await prisma.reward.createMany({
    data: [
      { userId: user.id, type: "Desconto 10%", applied: false },
      { userId: user.id, type: "Upgrade Quarto", applied: false }
    ]
  });

  await prisma.$disconnect();
  console.log('Dados demo carregados para Reclamações, Passes e Recompensas!');
}

seedDemoData();
