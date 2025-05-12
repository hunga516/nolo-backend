import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema({
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    quantity: { type: Number, required: true, default: 0 },
}, {
    timestamps: true,
})

export const InventoryModel = mongoose.model('Inventory', InventorySchema)

export const readAllInventorys = async () => {
    return await InventoryModel.find().populate('itemId').populate('userId')
}

export const readInventoryByUserId = async (userId: string) => {
    return await InventoryModel.findOne({userId}).populate('itemId').populate('userId')
}