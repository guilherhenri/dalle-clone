import 'dotenv/config'

import express from 'express'
import cors from 'cors'

import connectDB from './mongodb/connect.js'

import postRoutes from './routes/post.routes.js'
import dalleRoutes from './routes/dalle.routes.js'

const app = express()

app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)

app.get('/', async (req, res) => {
  res.send('Hello from DALL-E')
})

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL)

    app.listen(
      8080, 
      () => console.log('Server has started on port http://localhost:8080')
    )
  } catch (error) {
    console.error(error)
  }
}

startServer()