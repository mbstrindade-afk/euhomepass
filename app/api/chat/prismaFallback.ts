const memoryOnlyFlag =
  process.env.CHAT_MEMORY_ONLY === 'true' ||
  process.env.NEXT_PUBLIC_CHAT_MEMORY_ONLY === 'true';

let prismaUnavailableFlag = false;

export const isMemoryOnly = () => memoryOnlyFlag;

export const isPrismaUnavailable = () => memoryOnlyFlag || prismaUnavailableFlag;

export const markPrismaUnavailable = (error?: unknown) => {
  if (!prismaUnavailableFlag) {
    console.warn('Prisma chat repository unavailable, using in-memory store.', error);
  }
  prismaUnavailableFlag = true;
};
