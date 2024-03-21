const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');


const dataUsers = [
  {
    cellphone: "89988191796",
    kind: "admin",
    name: "pedro",
    password: "senha1",
    address: 'Rua 1',
    cpf_cnpj: '192.168.203-72'
  },
  {
    cellphone: "86988191796",
    kind: "user",
    name: "joão",
    password: "senha2",
    address: 'Rua 2',
    cpf_cnpj: '192.168.203-72'
  }
]

async function seedUsers(prisma) {

  try {

    const insertData = await Promise.all(
      dataUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return {...user, password: hashedPassword}
      }),
    );

    await prisma.users.createMany({
      data: insertData
    });

    return true;
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function main() {
  const prisma = new PrismaClient();

  await seedUsers(prisma);

}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
