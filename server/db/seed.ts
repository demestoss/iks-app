import { PrismaClient, type Prisma } from '@prisma/client'

const prisma = new PrismaClient();

const userData = [
  {
    id: 'mock-user',
    email: 'mock@mock.kz',
    raw_user_meta_data: "{ name: \"Nascard\" }"
  }
] satisfies Prisma.usersCreateInput[]

async function main() {
  console.log("Start seeding ...")
  for (const u of userData) {
    const user = await prisma.users.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log("Seeding finished.")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
