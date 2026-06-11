import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  let url = process.env.DATABASE_URL;
  // Automatically force a connection limit of 1 in Vercel Serverless environment to prevent exhausting Aiven database slots
  if (url && process.env.NODE_ENV === 'production' && !url.includes('connection_limit')) {
    url = url.includes('?') ? `${url}&connection_limit=1` : `${url}?connection_limit=1`;
  }

  return new PrismaClient(url ? { datasources: { db: { url } } } : undefined);
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Ensure thread-safety and prevent connection limits during Next.js hot reloading
export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
