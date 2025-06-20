import { Plato } from "@prisma/client";

import { db } from "../db/db";

export type Categoria = 'ENTRADA' | 'PLATO_PRINCIPAL' | 'POSTRE';

export class PlatoRepository {

    async createPlato(nombre: string, descripcion: string, precio: number, categoria: Categoria): Promise<Plato | null> {
        const plato = await db.plato.create({
            data: {
                nombre, 
                descripcion,
                precio,
                categoria,
            }
        });
        return plato;
    }

    async getAllPlatos(): Promise<Plato[]> {
        const platos = await db.plato.findMany();
        return platos;
    }

    async getMesaById(id: number): Promise<Plato | null> {
        const mesa = await db.mesa.findUnique({
            where: { idMesa: id }
        });
        return mesa;
    }

    async reservarMesa(id: number, idUser: string): Promise<Plato | null> {
        const updatedMesa = await db.mesa.update({
            where: { idMesa: id },
            data: { 
                disponible: false, 
                idUser: idUser 
            }
        });
        return updatedMesa;
    }

    async disponibilizarMesa(id: number): Promise<Plato | null> {
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