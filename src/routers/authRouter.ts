    import { Router } from "express"

    import { UserService } from "../services/userService"
    import { AuthError } from "../auth/authErrors";

    interface CreateUserBody {
    username: string,
    email: string,
    password: string,
    telefono: number,
    }

    const userService = new UserService();

    export const authRouter = Router()

    authRouter.post('/register', async (req, res) => {
        try {
            const { username, password, email, telefono } = req.body;
            const user = await userService.registerUser(username, password, email, telefono);
            res.status(200).json({ ok: true, data: user });
        } catch (error) {
            if (error instanceof AuthError) {
                res.status(error.statusCode).json({ ok: false, error: error.message });
            } else {
                res.status(500).json({ ok: false, error: (error as any).message});
            }
        }
    });

    authRouter.post('/login', async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await userService.loginUser(username, password);
            res.status(200).json({ ok: true, data: user });
        } catch (error) {
            if (error instanceof AuthError) {
                res.status(error.statusCode).json({ ok: false, error: error.message });
            } else {
                res.status(500).json({ ok: false, error: (error as any).message});
            }
        }
    });