import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import * as mongoose from 'mongoose'

const app = express()

app.use(
    cors({
        credentials: true,
    })
)

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(8080, () => console.log('Server is running on port 8080'))

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
