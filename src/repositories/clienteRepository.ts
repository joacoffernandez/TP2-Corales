import { Cliente } from "@prisma/client";

import { db } from "../db/db";

export class ClienteRepository {

    async createCliente(username: string, email: string, password: string, telefono: number): Promise<Cliente> {
        const user = await db.cliente.create({
            data: {
                username,
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