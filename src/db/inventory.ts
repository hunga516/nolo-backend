import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema({
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    clerkId: { type: String },
    quantity: { type: Number, required: true, default: 1 },
}, {
    timestamps: true,
})

export const InventoryModel = mongoose.model('Inventory', InventorySchema)

export const readAllInventorys = async () => {
    return await InventoryModel.find().populate('itemId').populate('userId')
}

export const readInventoryByUserId = async (userId: string, clerkId: string) => {
    return await InventoryModel.findOne({ userId, clerkId }).populate('itemId').populate('userId')
}

export const readAllInventoriesByUserId = async (userId: string) => {
    return await InventoryModel.find({ userId }).populate('itemId').populate('userId')
}

export const readInventoryByUserIdAndItemId = async (userId: string, itemId: string) => {
    return await InventoryModel.findOne({ userId, itemId }).populate('itemId').populate('userId')
}

export const readAllInventoriesByClerkId = async (clerkId: string) => {
    return await InventoryModel.find({ clerkId }).populate('itemId')
}

export const createInventory = async (inventory: Record<string, any>) => {
    const newInventory = new InventoryModel(inventory)
    await newInventory.save()

    return newInventory
}