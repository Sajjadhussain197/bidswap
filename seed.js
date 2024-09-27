// seed.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Define the service types you want to seed
  const serviceTypes = [
    { name: 'BIDDING' },
    { name: 'BARTING' },
    { name: 'SELLING' },

    // Add more service types as needed
  ];

  // Iterate over each service type and create it in the database
  for (const service of serviceTypes) {
    await prisma.serviceType.create({
      data: service,
    });
  }

  console.log('Service types seeded successfully');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
