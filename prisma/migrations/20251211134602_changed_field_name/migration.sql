/*
  Warnings:

  - You are about to drop the column `marks` on the `pupils` table. All the data in the column will be lost.
  - Added the required column `grade` to the `pupils` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pupils" DROP COLUMN "marks",
ADD COLUMN     "grade" INTEGER NOT NULL;
