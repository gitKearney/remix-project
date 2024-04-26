-- CreateTable
CREATE TABLE "Collections" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "descriptions" VARCHAR(255) NOT NULL,
    "stocks" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bids" (
    "id" SERIAL NOT NULL,
    "collection_id" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Bids_pkey" PRIMARY KEY ("id")
);
