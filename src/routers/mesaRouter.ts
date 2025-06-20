import { Router } from "express"

import { UserService } from "../services/userService"
import { adminMiddleware, authMiddleware, userMiddleware } from "../auth/middleware";
import { MesaService } from "../services/mesaService";

interface CreateUserBody {
  username: string,
  email: string,
  password: string,
  telefono: number,
}

const mesaService = new MesaService();

export const mesaRouter = Router()

mesaRouter.get('/', async (_, res) => {
  try {
    const mesas = await mesaService.getAllMesas();
    res.status(200).json({ ok: true, data: mesas })
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
})

mesaRouter.post('/', async (req, res) => {
  try {
    const { id, capacidad } = req.body;
    const mesa = await mesaService.createMesa(id, capacidad);
    res.status(200).json({ ok: true, data: mesa })
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
})

mesaRouter.get('/reservar/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const mesa = await mesaService.reservarMesa(id, req.user.id);
    res.status(200).json({ ok: true, data: mesa })
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
})

mesaRouter.get('/disponibilizar/:id', adminMiddleware, async (req, res) => {
    try {  
        const id = Number(req.params.id);
        const mesa = await mesaService.disponibilizarMesa(id);
        res.status(200).json({ ok: true, data: mesa })
    } catch (error) {
        res.status(500).json({ ok: false, error: (error as any).message })
    }
});