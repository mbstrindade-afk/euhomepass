// Script para migrar listings do mock para o banco de dados via Prisma
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


const userListings = [
  {
    title: "Home in Porto",
    description: "Available home in Porto",
    city: "Porto",
    country: "Portugal",
    type: "Apartment",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    images: ["/home.svg"],
    amenities: [],
    price: { amount: 0, currency: "€", period: "month" },
    hostRating: 0,
    isActive: true,
    isVerified: true,
    euOnly: true,
    createdAt: new Date("2024-08-15"),
    updatedAt: new Date("2024-09-10")
  },
  // ...adicione os outros objetos do mock aqui...
];


async function migrateListings() {
  // Cria usuário padrão
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

  for (const listing of userListings) {
    await prisma.listing.create({ data: { ...listing, hostId: user.id } });
    console.log(`Listing migrada: ${listing.title}`);
  }
  await prisma.$disconnect();
  console.log('Migração concluída!');
}

migrateListings();
