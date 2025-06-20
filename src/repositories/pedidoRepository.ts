import { Mesa } from "@prisma/client";

import { db } from "../db/db";

export class PedidoRepository {

    async createPedido(id: number, capacidad: number): Promise<Mesa | null> {
        const mesa = await db.pedidoCab.create({
            data: {
                idMesa: id, 
                disponible: true,
                capacidad: capacidad
            }
        });
        return mesa;
    }

    async getAllPedidos(): Promise<Mesa[]> {
        const mesas = await db.mesa.findMany({
            where: { disponible: true }
        });
        return mesas;
    }

    async getPedidoById(id: number): Promise<Mesa | null> {
        const mesa = await db.mesa.findUnique({
            where: { idMesa: id }
        });
        return mesa;
    }

    async reservarMesa(id: number, idUser: string): Promise<Mesa | null> {
        const updatedMesa = await db.mesa.update({
            where: { idMesa: id },
            data: { 
                disponible: false, 
                idUser: idUser 
            }
        });
        return updatedMesa;
    }
}