const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Ensure admin user exists if not present in allowlist
  const adminEmail = process.env.ADMIN_INITIAL_EMAIL || 'admin@example.com'
  let user = await prisma.user.findUnique({ where: { email: adminEmail } })
  if (!user) {
    user = await prisma.user.create({ data: { email: adminEmail, isAdmin: true } })
    console.log('Seeded admin user:', adminEmail)
  } else {
    if (!user.isAdmin) {
      await prisma.user.update({ where: { email: adminEmail }, data: { isAdmin: true } })
      console.log('Updated admin flag for:', adminEmail)
    }
  }
}

main().catch(e => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})
