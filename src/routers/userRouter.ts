import { Router } from "express"

import { UserService } from "../services/userService"
import { adminMiddleware, authMiddleware } from "../auth/middleware";

interface CreateUserBody {
  username: string,
  email: string,
  password: string,
  telefono: number,
}

const userService = new UserService();

export const userRouter = Router()

userRouter.get('/', async (_, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ ok: true, data: users })
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
})

userRouter.put('/:username/role', adminMiddleware, async (req, res) => {
  try {
    const id = req.params.username;
    const { rol } = req.body;
    const user = await userService.changeUserRol(id, rol);
    res.status(200).json({ ok: true, data: user })
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
})

userRouter.get('/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const user = await userService.getUserByUsername(username);
    res.status(200).json({ ok: true, data: user })
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
})
