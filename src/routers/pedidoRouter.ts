import { Router } from "express"

import { UserService } from "../services/userService"
import { authMiddleware } from "../auth/middleware";
import { MesaService as PedidoService } from "../services/mesaService";

interface CreateUserBody {
  username: string,
  email: string,
  password: string,
  telefono: number,
}

const pedidoService = new PedidoService();

export const pedidoRouter = Router()

pedidoRouter.get('/', async (_, res) => {
  try {
    const mesas = await pedidoService.getAllMesas();
    res.status(200).json({ ok: true, data: mesas })
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
})

pedidoRouter.post('/', async (req, res) => {
  try {
    const { id, capacidad } = req.body;
    const mesa = await pedidoService.createMesa(id, capacidad);
    res.status(200).json({ ok: true, data: mesa })
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
})

pedidoRouter.get('/reservar/:id', async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ ok: false, error: 'Usuario no autenticado' });
      return;
    }

    const id = Number(req.params.id);
    const mesa = await pedidoService.reservarMesa(id, req.user.id);
    res.status(200).json({ ok: true, data: mesa })
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
})

/* disponibilizar mesa admin */ 