import { createMarketController, purchaseMarketController, readAllMarketsController } from '../controllers/markets.controller';
import express from 'express';

export const marketRoute = (route: express.Router) => {
    route.post('/markets', createMarketController)
    route.post('/markets/purchase/:id', purchaseMarketController)
    route.get('/markets', readAllMarketsController)
}
