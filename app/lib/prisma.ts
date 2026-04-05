import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as any;

export function isDatabaseConfigured() {
  return !!process.env.DATABASE_URL;
}

// PrismaClient needs DATABASE_URL at runtime. If DATABASE_URL isn't provided,
// we keep `prisma` as `null` and let API routes fall back to a dev store.
export const prisma: PrismaClient | null = isDatabaseConfigured()
  ? globalForPrisma.prisma || new PrismaClient()
  : null;

if (isDatabaseConfigured() && process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
