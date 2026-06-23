import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  return new PrismaClient({
    log: [
      { level: 'error', emit: 'stdout' },
      ...(process.env.NODE_ENV !== 'production'
        ? ([{ level: 'warn' as const, emit: 'stdout' as const }])
        : []),
    ],
  })
}

export const db =
  globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
