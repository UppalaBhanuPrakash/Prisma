// prismaClient.js
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Postgres driver adapter
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

// Prisma Client instance WITH options (Prisma 7 style)
const prisma = new PrismaClient({ adapter });

export default prisma;
