import { PrismaClient } from '@/app/generated/prisma'

const prisma = new PrismaClient()

async function main() {
    await prisma.test.create({
        data: {}
    })
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