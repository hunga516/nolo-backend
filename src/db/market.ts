import mongoose from "mongoose";

const MarketSchema = new mongoose.Schema({
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },

}, {
    timestamps: true,
})

export const MarketModel = mongoose.model("Market", MarketSchema);

export const readAllMarkets = async () => {
    return await MarketModel.find().populate("itemId").populate("userId");
}

export const createMarket = async (market: Record<string, any>) => {
    const newMarket = new MarketModel(market)
    await newMarket.save();

    return newMarket;
}