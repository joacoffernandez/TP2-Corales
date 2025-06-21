import { Estado, Mesa, PedidoCab, PedidoDet, Plato } from "@prisma/client";

import { db } from "../db/db";

export class PedidoRepository {

    async createPedidoCab(idUser: string, direccion: string, descuento: number): Promise<PedidoCab | null> {
        const pedido = await db.pedidoCab.create({
            data: {
                idUser, 
                descuento,
                direccion
            }
        });
        return pedido;
    }

    async createPedidoDet(idPedidoCab: string, idPlato: string): Promise<PedidoDet | null> {
        const pedido = await db.pedidoDet.create({
            data: {
                idPedidoCab, 
                idPlato
            }
        });
        return pedido;
    }

    async getPedidosByUserId(idUser: string): Promise<PedidoCab[]> {
        const pedidos = await db.pedidoCab.findMany({
            where: { idUser }
        });
        return pedidos;
    }

    async updatePedidoCab(idPedidoCab: string, montoTotal: number): Promise<PedidoCab | null> {
        const updatedPedido = await db.pedidoCab.update({
            where: { idPedidoCab },
            data: { monto: montoTotal }
        });
        return updatedPedido;
    }

    async getAllPedidosCab(): Promise<PedidoCab[]> {
        const pedidos = await db.pedidoCab.findMany({});
        return pedidos;
    }

    async getPedidosDetByCab(idPedidoCab: string): Promise<PedidoDet[]> {
        const pedidos = await db.pedidoDet.findMany({where: { idPedidoCab }});
        return pedidos;
    }

    async getPedidoCabById(idCab: string): Promise<PedidoCab | null> {
        const pedido = await db.pedidoCab.findUnique({
            where: { idPedidoCab: idCab }
        });
        return pedido;
    }

    async updateEstadoPedidoCab(idPedidoCab: string, estado: Estado): Promise<PedidoCab | null> {
        const updatedPedido = await db.pedidoCab.update({
            where: { idPedidoCab },
            data: { estado }
        });
        return updatedPedido;
    }

}