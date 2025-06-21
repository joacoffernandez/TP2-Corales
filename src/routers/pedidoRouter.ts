import { Router } from "express"

import { UserService } from "../services/userService"
import { adminOrMozoMiddleware, authMiddleware } from "../auth/middleware";
import { PedidoService } from "../services/pedidoService";

interface CreateUserBody {
  username: string,
  email: string,
  password: string,
  telefono: number,
}

const pedidoService = new PedidoService();

export const pedidoRouter = Router()

pedidoRouter.get('/cab', adminOrMozoMiddleware, async (_, res) => {
  try {
    const pedidos = await pedidoService.getAllPedidosCab();
    res.status(200).json({ ok: true, data: pedidos })
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
})

pedidoRouter.get('/det/:idCab', adminOrMozoMiddleware, async (req, res) => {
  try {
    const idCab = req.params.idCab;
    const pedidos = await pedidoService.getPedidosDetByCab(idCab);
    res.status(200).json({ ok: true, data: pedidos })
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
})

pedidoRouter.post('/', async (req, res) => {
  try {
    const { direccion, platos } = req.body; // platos lista de nombres de platos
    const userId = req.user.id;
    const mesa = await pedidoService.createPedido(userId, direccion, platos);
    res.status(200).json({ ok: true, data: mesa })
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
})

pedidoRouter.put('/:idCab', adminOrMozoMiddleware, async (req, res) => {
  try {
    const idCab = req.params.idCab;
    const { estado } = req.body; // estado puede ser 'PENDIENTE' 'EN_COCINA' 'ENVIADO'
    const pedido = await pedidoService.updateEstadoPedido(idCab, estado);
    res.status(200).json({ ok: true, data: pedido })
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
})