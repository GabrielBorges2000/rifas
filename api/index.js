import rifasRoutes from './routes/rifas.js'
import ganhadoresRoutes from './routes/ganhadores.js'
import compradoresRoutes from './routes/compradores.js'

import express, { json } from 'express'
import mongoose from 'mongoose'

const app = express()
const port = 3080

app.use(json())

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('conectado com sucesso'))
  .catch((error) => console.log(error.message))

app.use('/api/rifas', rifasRoutes)

app.use('/api/ganhadores', ganhadoresRoutes)

app.use('/api/compradores', compradoresRoutes)

app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`),
)
