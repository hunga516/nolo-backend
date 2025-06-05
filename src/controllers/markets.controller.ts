import { getUserById, UserModel } from '../db/user';
import { createInventory, InventoryModel, readInventoryByUserIdAndItemId } from '../db/inventory';
import { readAllMarkets, MarketModel, readMarket } from '../db/market';
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

export const purchaseMarketController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { buyerId, itemId } = req.body
    const { id } = req.params

    const market = await readMarket(id)

    if (!market) {
        return res.status(404).json({
            message: 'Market not found',
        });
    }
    const sellerId = market.userId._id


    try {
        const existingInventory = await readInventoryByUserIdAndItemId(buyerId, itemId)
        const coinsTransact = market.price * market.quantity
        const buyer = await getUserById(buyerId)
        console.log(buyer, buyerId);

        if (!buyer || buyer.coins < coinsTransact) {
            return res.status(400).json({ message: 'Không đủ coins để mua vật phẩm' })
        }
        await UserModel.findByIdAndUpdate(buyerId, { $inc: { coins: -coinsTransact } }, { new: true })
        await UserModel.findByIdAndUpdate(sellerId, { $inc: { coins: coinsTransact } }, { new: true })

        if (existingInventory) {
            existingInventory.quantity += market.quantity
            if (existingInventory.quantity < 0) {
                await InventoryModel.findByIdAndDelete(existingInventory._id)
            }
            await existingInventory.save()
            await MarketModel.findByIdAndDelete(id)
            return res.json({
                message: "Vat pham da duoc mua thanh cong",
                existingInventory
            })
        } else {
            const newInventory = await createInventory({ userId: buyerId, itemId, quantity: market.quantity })

            await MarketModel.findByIdAndDelete(id)
            return res.json({
                message: "Vat pham da duoc mua thanh cong",
                newInventory
            })
        }

    } catch (error) {
        console.error('Purchase market error:', error);
        return res.status(500).json({ message: 'Lỗi khi mua vật phẩm' });
    }
}