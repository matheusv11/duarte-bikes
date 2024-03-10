const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

async function seedUsers(prisma) {

  try {
    const email = "math2@gmail.com"
    const kind = "user"
    const name = "pedro"
    const hashedPassword = await bcrypt.hash("senha2", 10);

    await prisma.users.create({
      data: {
        email: email,
        kind: kind,
        name: name,
        password: hashedPassword,
      }
    })

    return true;
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function main() {
  console.log("CHEGUEI")
  const prisma = new PrismaClient();

  await seedUsers(prisma);

}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
