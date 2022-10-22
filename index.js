import colors from 'colors'
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

import { notFound, errorHandler } from './middlewares/errorMiddleware.js'

import connectDB from './config/db.js'
import postRoute from './routes/postRoute.js'
import userRoute from './routes/userRoute.js'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

dotenv.config()
connectDB()

app.use('/api/posts', postRoute)
app.use('/api/users', userRoute)

const __dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('App is running well.')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server is running in port ${PORT} on ${process.env.NODE_ENV} mode`
  )
)
