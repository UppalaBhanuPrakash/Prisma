/*
  Warnings:

  - You are about to drop the column `name` on the `departments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "practice"."departments" DROP COLUMN "name",
ADD COLUMN     "names" VARCHAR(100);
