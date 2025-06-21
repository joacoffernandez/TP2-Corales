import { Router } from "express"

import { UserService } from "../services/userService"
import { adminMiddleware, adminOrMozoMiddleware, authMiddleware, userMiddleware } from "../auth/middleware";
import { PlatoService } from "../services/platoService";

interface CreateUserBody {
  username: string,
  email: string,
  password: string,
  telefono: number,
}

const platoService = new PlatoService();

export const platoRouter = Router()

platoRouter.get('/', async (_, res) => {
  try {
    const platos = await platoService.getAllPlatos();
    res.status(200).json({ ok: true, data: platos })
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
})

platoRouter.post('/', adminMiddleware, async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoria } = req.body;
    const plato = await platoService.createPlato(nombre, descripcion, precio, categoria);
    res.status(200).json({ ok: true, data: plato })
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
})