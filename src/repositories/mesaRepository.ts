import { Mesa } from "@prisma/client";

import { db } from "../db/db";

export class MesaRepository {

    async createMesa(id: number, capacidad: number): Promise<Mesa | null> {
        const mesa = await db.mesa.create({
            data: {
                idMesa: id, 
                disponible: true,
                capacidad: capacidad
            }
        });
        return mesa;
    }

    async getAllMesas(): Promise<Mesa[]> {
        const mesas = await db.mesa.findMany({
            where: { disponible: true }
        });
        return mesas;
    }

    async getMesaById(id: number): Promise<Mesa | null> {
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

    async disponibilizarMesa(id: number): Promise<Mesa | null> {
        const updatedMesa = await db.mesa.update({
            where: { idMesa: id },
            data: { 
                disponible: true, 
                idUser: null 
            }
        });
        return updatedMesa;
    }
}