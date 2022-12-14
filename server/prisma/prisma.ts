import { Prisma, PrismaClient } from "@prisma/client";

const DATABASE_LOG = process.env.DATABASE_LOG;

const prisma = new PrismaClient({
    log: DATABASE_LOG ? DATABASE_LOG.split(':') as Prisma.LogLevel[] : [],
});

export default prisma;