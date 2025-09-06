"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMarket = exports.readMarket = exports.readAllMarkets = exports.MarketModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MarketSchema = new mongoose_1.default.Schema({
    itemId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Item" },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
}, {
    timestamps: true,
});
exports.MarketModel = mongoose_1.default.model("Market", MarketSchema);
const readAllMarkets = async () => {
    return await exports.MarketModel.find().populate("itemId").populate("userId");
};
exports.readAllMarkets = readAllMarkets;
const readMarket = async (id) => {
    return await exports.MarketModel.findById(id).populate("itemId").populate("userId");
};
exports.readMarket = readMarket;
const createMarket = async (market) => {
    const newMarket = new exports.MarketModel(market);
    await newMarket.save();
    return newMarket;
};
exports.createMarket = createMarket;
//# sourceMappingURL=market.js.map