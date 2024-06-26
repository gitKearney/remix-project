import { Bids } from "@prisma/client";
import prisma from "~/db.server";

export async function getAllBids(): Promise<Bids[]> {
  return prisma.bids.findMany({});
}

export async function getBids(collectionId: number): Promise<Bids[]> {
  return prisma.bids.findMany({
    where: { collection_id: collectionId },
  });
}

export async function updateBid(bidId: number, datum): Promise<void> {
  await prisma.bids.update({
    where: { id: bidId },
    data: {
      price: datum.price,
      status: datum.status,
    },
  });
}

export async function createBid(datum: Bids): Promise<void> {
  await prisma.bids.create({
    data: {
      price: datum.price,
      status: datum.status,
      collection_id: datum.collection_id,
      user_id: datum.user_id,
    },
  });
}
