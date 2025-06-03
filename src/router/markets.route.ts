import { createMarketController, readAllMarketsController } from '../controllers/markets.controller';
import express from 'express';

export const marketRoute = (route: express.Router) => {
    route.post('/markets', createMarketController)
    route.get('/markets', readAllMarketsController)
}
