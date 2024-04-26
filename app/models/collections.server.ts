import { Collections } from "@prisma/client";
import prisma from "~/db.server";

export async function getCollections(): Promise<Collections[]> {
  return prisma.collections.findMany();
}

export async function getCollection(name: string): Promise<Collections | null> {
  return prisma.collections.findFirst({
    where: { name: name },
  });
}

export async function updateCollection(data: Collections): Promise<boolean> {
  console.log("data", JSON.stringify(data, null, 2));
  try {
    await prisma.collections.update({
      where: { id: data.id },
      data: {
        descriptions: data.descriptions,
        name: data.name,
        price: data.price,
        stocks: data.stocks,
      },
    });
  } catch (e) {
    console.log(`[ERROR] updating collections [${data.id}]`);
    return false;
  }

  return true;
}

export async function createCollection(formdata: Collections) {
  console.log("create", JSON.stringify(formdata, null, 2));

  try {
    await prisma.collections.create({
      data: {
        descriptions: formdata.descriptions,
        name: formdata.name,
        price: formdata.price,
        stocks: formdata.stocks,
      },
    });
  } catch (e) {
    console.log(`[ERROR] createCollection ${e}`);
  }
}
