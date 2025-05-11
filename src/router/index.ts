import express from 'express'
import authenticationRouter from './authentication'
import userRoute from './users'
import itemsRouter from './items'

const router = express.Router()

export default function setupRoutes(): express.Router {
    authenticationRouter(router)
    userRoute(router)
    itemsRouter(router)
    return router
}
