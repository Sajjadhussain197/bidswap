const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function verifyFields() {
  const user = await prisma.user.findUnique({
    where: {
      email: 'hakathon197@gmail.com',
    },
  });

  console.log('User:', user);
}

verifyFields()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
