import "dotenv/config"

import express from 'express';

import { userRouter } from './routers/userRouter';

const app = express()

app.use(express.json())

app.use('/users', userRouter)

app.listen(8000, () => {
  console.log(`App listening on http://localhost:8000`)
})