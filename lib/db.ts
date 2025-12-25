import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prismaClientSingLeton = () => {
  return new PrismaClient({ adapter });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingLeton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingLeton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

export default prisma;

export * from "./generated/prisma/client";
