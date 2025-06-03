import { InventoryModel } from '../db/inventory';
import { readAllMarkets, MarketModel } from '../db/market';
import express from 'express';

export const createMarketController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { itemId, userId, price, quantity = 1 } = req.body;

    try {
        if (!itemId || !userId || !price || !quantity) {
            return res.status(400).json({
                message: 'Missing required fields',
            });
        }

        const existingEnventory = await InventoryModel.findOne({ itemId, userId });

        if (!existingEnventory) {
            return res.status(404).json({
                message: 'Inventory not found for the given item and user',
            });
        }

        if (existingEnventory.quantity < quantity) {
            return res.status(400).json({
                message: 'Insufficient inventory quantity',
            });
        }

        existingEnventory.quantity -= quantity;
        await existingEnventory.save()

        const newMarket = new MarketModel({
            itemId,
            userId,
            price,
            quantity,
        })
        await newMarket.save();

        res.json({
            message: 'Market created successfully',
            market: newMarket,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating market',
        });
    }
}

export const readAllMarketsController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const markets = await readAllMarkets()

        res.json({
            message: 'Markets fetched successfully',
            markets,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching markets',
        });
    }
}