//create prisma client to access the dabase (./db/index.ts)

import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();
