import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const itemsWithDesc = await prisma.medicine.findMany({
    where: {
      NOT: {
        OR: [
          { description: null },
          { description: '' }
        ]
      }
    }
  });

  console.log('Items WITH description:', JSON.stringify(itemsWithDesc, null, 2));
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
