import { PedidoCab } from "@prisma/pedido_cab";

import { db } from "../db/db";

export class PedidoCabRepository {

    async createPedidoCab(idcliente: string, monto: number, descuento:number, iddireccion:string): Promise<PedidoCab> {
        const user = await db.user.e({
            data: {
                idcliente,
                idestado: 0,
                monto,
                descuento,
                iddireccion
            }
        });
        return user;
    }
 
    async changePedidoState(idPedidoCab: string, newEstadoId: number): Promise<PedidoCab> {
        const updatedPedido = await db.pedidoCab.update({
            where: {
                idPedidoCab: idPedidoCab
            },
            data: {
                idEstado: newEstadoId
            }
        });

        return updatedPedido;
        }


    async getPedidosByUser(idCliente: string): Promise<PedidoCab[]> {
        const pedidos = await db.pedidoCab.findMany({
            where: {
                idCliente: idCliente
            },
            include: {
                estado: true,
                direccion: true,
                pedidos_det: true,
            }
        });

        return pedidos;
    }


    async getPedidosByState(idEstado: number): Promise<PedidoCab[]> {
        const pedidos = await db.pedidoCab.findMany({
            where: {
                idEstado: idEstado
            },
                include: {
                estado: true,
                direccion: true,
                pedidos_det: true,
            }
        });

        return pedidos;
    }


   

}