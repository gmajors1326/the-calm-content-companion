import { PrismaClient } from '@prisma/client'

declare global {
  var __prisma: PrismaClient | undefined
}

export const prisma: PrismaClient = (globalThis as any).__prisma ?? new PrismaClient()

if (process.env.NODE_ENV === 'development') {
  ;(globalThis as any).__prisma = prisma
}

export default prisma
