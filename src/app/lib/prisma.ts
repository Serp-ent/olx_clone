import { PrismaClient } from '@prisma/client'

// TODO: make sure there is only one prisma client

const prisma = new PrismaClient();

export default prisma;