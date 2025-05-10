import express from 'express'
import authenticationRouter from './authentication'
import userRoute from './users'

const router = express.Router()

export default function setupRoutes(): express.Router {
    authenticationRouter(router)
    userRoute(router)
    return router
}
