import "dotenv/config";
import express from 'express';
import { userRouter } from './routers/userRouter';
import { authRouter } from "./routers/authRouter";
import { authMiddleware, userMiddleware } from "./auth/middleware";
import { mesaRouter } from "./routers/mesaRouter";
import { platoRouter } from "./routers/platoRouter";
import { pedidoRouter } from "./routers/pedidoRouter";
//import { authMiddleware } from './auth/middleware';

const app = express()
app.use(express.json())


app.use('/auth', authRouter)
app.use(['/users', '/mesas', '/platos', '/pedidos'], authMiddleware())
app.use('/users', userRouter)
app.use('/mesas', mesaRouter)
app.use('/platos', platoRouter)
app.use('/pedidos', pedidoRouter)

app.listen(8000, () => {
  console.log(`App listening on http://localhost:8000`)
})  