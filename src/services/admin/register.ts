import prisma from '../../database/db';
import { SimpleUser } from '../../interfaces/user.interface';
import hash from 'bcrypt';

export default async function registerService({ email, name, password}: SimpleUser) {
    const userAdmin = await prisma.admin.create({
        data: {
            email,
            password: hash.hashSync(password, 12),
            name,
        }
    });

    return { ...userAdmin, id: undefined, password: undefined, updatedAt: undefined };
}