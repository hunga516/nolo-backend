import express from 'express'
import authenticationRouter from './authentication'
import itemsRouter from './items.route'
import inventoriesRouter from './inventories.route'
import usersRoute from './users.route'
import videosRouter from './videos.route'
import { marketRoute } from './markets.route'

const router = express.Router()

export default function setupRoutes() {
    authenticationRouter(router)
    usersRoute(router)
    itemsRouter(router)
    inventoriesRouter(router)
    videosRouter(router)
    marketRoute(router)

    return router
}
