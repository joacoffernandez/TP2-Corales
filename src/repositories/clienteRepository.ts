import { Cliente } from "@prisma/cliente";

import { db } from "../db/db";

export class ClienteRepository {

    async createUser(nombre: string, email: string, password: string, telefono: string): Promise<Cliente> {
        const user = await db.user.create({
            data: {
                nombre,
                email,
                password,
                telefono
            }
        });
        return user;
    }

    async findByUsername(username: string): Promise<Cliente | null> {
        const user = await db.cliente.findUnique({
            where: { username }
        });
        return user;
    }
}