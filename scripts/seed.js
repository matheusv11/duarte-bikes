const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');


const dataUsers = [
  {
    cellphone: "89994107043",
    kind: "admin",
    name: "Duarte",
    password: "duar7e#@b1kes",
    address: 'Rua 1',
    cpf_cnpj: '192.168.203-72'
  },
  // {
  //   cellphone: "86988191796",
  //   kind: "user",
  //   name: "joão",
  //   password: "senha2",
  //   address: 'Rua 2',
  //   cpf_cnpj: '192.168.203-72'
  // }
]

const dataProducts = Array.from({ length: 55 }).map((_, i) => (
  {
    name: `Produto ${i}`,
    buyedValue: Number((Math.random() * 100).toFixed(2).replace('R$', '').replace(/[^\w\s]/gi, '')),
    quantity: Number((Math.random() * 50).toFixed()),
    soldValue: Number((Math.random() * 100).toFixed(2).replace('R$', '').replace(/[^\w\s]/gi, '')),
    description: `Teste ${i}`
  }
))

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

async function seedProducts(prisma) {

  try {

    await prisma.products.createMany({
      data: dataProducts
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
  // await seedProducts(prisma);
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
