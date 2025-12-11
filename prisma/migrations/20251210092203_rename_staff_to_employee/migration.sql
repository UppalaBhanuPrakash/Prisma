-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "age" INTEGER,
    "salary" DECIMAL(10,2),

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);
