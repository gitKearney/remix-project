import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * @description The seeder `npx prisma db seed`
 */

async function seed() {
  await prisma.bids.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.collections.deleteMany({});

  /** @type User */
  const john = {
    email: "john.doe@example.com",
    name: "John Doe",
    id: 1,
  };

  /** @type {Array<Collections>} */
  const stocks = [
    {
      descriptions: "futures for apples",
      name: "ftr_apl",
      price: 700,
      stocks: 1000,
      id: 1,
    },
    {
      descriptions: "futures for bananas",
      name: "ftr_bns",
      price: 500,
      stocks: 1000,
      id: 2,
    },
  ];

  /** @type {Array<Bids>} */
  const bids = [
    {
      collection_id: 1,
      user_id: 1,
      id: 100,
      price: 700,
      status: "pending",
    },
    {
      collection_id: 1,
      user_id: 1,
      id: 101,
      price: 700,
      status: "accepted",
    },
    {
      collection_id: 1,
      user_id: 1,
      id: 102,
      price: 700,
      status: "rejected",
    },
  ];

  await prisma.user.upsert({
    where: { id: john.id },
    update: john,
    create: john,
  });

  /** @type {Collections} stock */
  for (const stock of stocks) {
    await prisma.collections.upsert({
      where: { id: stock.id },
      update: stock,
      create: stock,
    });
  }

  for (const bid of bids) {
    await prisma.bids.upsert({
      where: { id: bid.id },
      update: bid,
      create: bid,
    });
  }

  // END OF seed()
  console.log(`Database has been seeded. 🌱`);
}

// run with npx prisma db seed
seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
