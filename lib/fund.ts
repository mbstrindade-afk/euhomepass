import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getFundBalance(): Promise<number> {
  // Soma entradas e subtrai saídas
  const entries = await prisma.fundTransaction.aggregate({
    _sum: { amount: true },
    where: { type: 'entry' }
  });
  const exits = await prisma.fundTransaction.aggregate({
    _sum: { amount: true },
    where: { type: 'exit' }
  });
  const totalEntries = entries._sum.amount || 0;
  const totalExits = exits._sum.amount || 0;
  return totalEntries - totalExits;
}
