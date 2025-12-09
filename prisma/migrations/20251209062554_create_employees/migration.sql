-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "salary" INTEGER NOT NULL,
    "email" TEXT,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);
