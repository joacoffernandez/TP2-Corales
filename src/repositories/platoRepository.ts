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

    async getPlatoByNombre(nombre: string): Promise<Plato | null> {
        const plato = await db.plato.findUnique({
            where: { nombre }
        });
        return plato;
    }
}