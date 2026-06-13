import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Starting AI data migration...");

  // Find all medicines that have interactions stored as a JSON string
  const medicines = await prisma.medicine.findMany({
    where: {
      interactions: {
        startsWith: '{'
      }
    }
  });

  console.log(`Found ${medicines.length} medicines to migrate.`);

  let successCount = 0;
  let failCount = 0;

  for (const medicine of medicines) {
    try {
      const parsedData = JSON.parse(medicine.interactions as string);
      
      await prisma.medicine.update({
        where: { id: medicine.id },
        data: {
          uses: parsedData.uses || [],
          howToUse: parsedData.howToUse || null,
          sideEffectsList: parsedData.sideEffects || [],
          interactionsList: parsedData.interactions || [],
          warnings: parsedData.warnings || []
        }
      });
      successCount++;
    } catch (err) {
      console.error(`Failed to migrate medicine ${medicine.id}:`, err);
      failCount++;
    }
  }

  console.log(`Migration complete! Success: ${successCount}, Failed: ${failCount}`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
