"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseMarketController = exports.readAllMarketsController = exports.createMarketController = void 0;
const user_1 = require("../db/user");
const inventory_1 = require("../db/inventory");
const market_1 = require("../db/market");
const createMarketController = async (req, res, next) => {
    const { itemId, userId, price, quantity = 1 } = req.body;
    try {
        if (!itemId || !userId || !price || !quantity) {
            return res.status(400).json({
                message: 'Missing required fields',
            });
        }
        const existingEnventory = await inventory_1.InventoryModel.findOne({ itemId, userId });
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
        await existingEnventory.save();
        const newMarket = new market_1.MarketModel({
            itemId,
            userId,
            price,
            quantity,
        });
        await newMarket.save();
        res.json({
            message: 'Market created successfully',
            market: newMarket,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error creating market',
        });
    }
};
exports.createMarketController = createMarketController;
const readAllMarketsController = async (req, res, next) => {
    try {
        const markets = await (0, market_1.readAllMarkets)();
        res.json({
            message: 'Markets fetched successfully',
            markets,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error fetching markets',
        });
    }
};
exports.readAllMarketsController = readAllMarketsController;
const purchaseMarketController = async (req, res, next) => {
    const { buyerId, itemId } = req.body;
    const { id } = req.params;
    const market = await (0, market_1.readMarket)(id);
    if (!market) {
        return res.status(404).json({
            message: 'Market not found',
        });
    }
    const sellerId = market.userId._id;
    try {
        const existingInventory = await (0, inventory_1.readInventoryByUserIdAndItemId)(buyerId, itemId);
        const coinsTransact = market.price * market.quantity;
        const buyer = await (0, user_1.getUserById)(buyerId);
        console.log(buyer, buyerId);
        if (!buyer || buyer.coins < coinsTransact) {
            return res.status(400).json({ message: 'Không đủ coins để mua vật phẩm' });
        }
        await user_1.UserModel.findByIdAndUpdate(buyerId, { $inc: { coins: -coinsTransact } }, { new: true });
        await user_1.UserModel.findByIdAndUpdate(sellerId, { $inc: { coins: coinsTransact } }, { new: true });
        if (existingInventory) {
            existingInventory.quantity += market.quantity;
            if (existingInventory.quantity < 0) {
                await inventory_1.InventoryModel.findByIdAndDelete(existingInventory._id);
            }
            await existingInventory.save();
            await market_1.MarketModel.findByIdAndDelete(id);
            return res.json({
                message: "Vat pham da duoc mua thanh cong",
                existingInventory
            });
        }
        else {
            const newInventory = await (0, inventory_1.createInventory)({ userId: buyerId, itemId, quantity: market.quantity });
            await market_1.MarketModel.findByIdAndDelete(id);
            return res.json({
                message: "Vat pham da duoc mua thanh cong",
                newInventory
            });
        }
    }
    catch (error) {
        console.error('Purchase market error:', error);
        return res.status(500).json({ message: 'Lỗi khi mua vật phẩm' });
    }
};
exports.purchaseMarketController = purchaseMarketController;
//# sourceMappingURL=markets.controller.js.map