-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "practice";

-- CreateTable
CREATE TABLE "practice"."departments" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "totalstudents" INTEGER NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);
