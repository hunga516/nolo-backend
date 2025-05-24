import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import * as mongoose from 'mongoose'
import setupRoutes from './router'
import { authentication } from './helpers'
import morgan from 'morgan'
import { initSocket } from './socket'

const app = express()

app.use(
    cors({
        credentials: true,
    })
)

app.use(compression())
app.use(cookieParser())
app.use(express.json())
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.body)
    next()
})



const server = http.createServer(app)
const io = initSocket(server)

const PORT = process.env.PORT || 8080
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

const MONGODB_URL =
    'mongodb+srv://hunga5160:hunga5160@cluster0.0uxnqct.mongodb.net/vi_video?retryWrites=true&w=majority'

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URL)
        console.log('Mongodb connected')
    } catch (error) {
        console.log('Mongodb connection failed: ', error)
    }
}
connectDB()

app.use('/', setupRoutes())
