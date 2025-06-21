import { Rol, User } from "@prisma/client";

import { db } from "../db/db";

export class UserRepository {

    async createUser(username: string, email: string, password: string, telefono: number, direccion: string): Promise<User> {
        const user = await db.user.create({
            data: {
                username,
                email,
                password,
                telefono,
                direccion
            }
        });
        return user;
    }

    async getUserByUsername(username: string): Promise<User | null> {
        const user = await db.user.findUnique({
            where: { username }
        });
        return user;
    }

    async getUserById(id: string): Promise<User | null> {
        const user = await db.user.findUnique({
            where: { idUser: id }
        }); 
        return user;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await db.user.findUnique({
            where: { email }
        });
        return user;
    }

    async changeUserRole(username: string, newRole: Rol): Promise<User | null> {
        const updatedUser = await db.user.update({
            where: { username },
            data: { rol: newRole }
        });
        return updatedUser;
    }

}


/*
        return db.user.findUnique({
            where: { idUser: userId },
            select: { direccion: true }
        }).then(user => user?.direccion || "");
*/