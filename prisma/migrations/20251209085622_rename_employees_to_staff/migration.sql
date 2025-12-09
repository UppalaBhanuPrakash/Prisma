/*
  Warnings:

  - You are about to drop the `employees` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "employees";

-- CreateTable
CREATE TABLE "staff" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "salary" INTEGER NOT NULL,
    "email" TEXT,
    "department" TEXT,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);
