import { PrismaClient, Prisma, UserRole } from '@prisma/client'
import * as bcrypt from 'bcrypt';

const generateHash = (value: string) => {
    const salt = bcrypt.genSaltSync(Math.floor(Math.random() * 10) + 1);
    return bcrypt.hashSync(value, salt);
}

const prisma = new PrismaClient()

const userData: Prisma.userCreateInput[] = [
    {
        name: 'super admin',
        email: 'super@gomerry.com',
        password_hash: generateHash("admin"),
        roles: [UserRole.ADMIN, UserRole.ADVISER, UserRole.SORTING],
    },
    {
        name: 'admin admin',
        email: 'admin@gomerry.com',
        password_hash: generateHash("admin"),
        roles: [UserRole.ADMIN],
    },
]

async function main() {
    console.log(`Start seeding ...`)
    for (const u of userData) {
        const user = await prisma.user.create({
            data: u,
        })
        console.log(`Created user with id: ${user.id}`)
    }
    console.log(`Seeding finished.`)
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