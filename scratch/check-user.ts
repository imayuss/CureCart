import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst();
  console.log("Current User Image URL:");
  console.log(user?.image);
}

main().catch(console.error).finally(() => prisma.$disconnect());
