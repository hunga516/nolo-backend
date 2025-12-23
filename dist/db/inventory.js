"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInventory = exports.readAllInventoriesByClerkId = exports.readInventoryByUserIdAndItemId = exports.readAllInventoriesByUserId = exports.readAllInventorys = exports.InventoryModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const InventorySchema = new mongoose_1.default.Schema({
    itemId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Item' },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    clerkId: { type: String },
    quantity: { type: Number, required: true, default: 1 },
}, {
    timestamps: true,
});
exports.InventoryModel = mongoose_1.default.model('Inventory', InventorySchema);
const readAllInventorys = async () => {
    return await exports.InventoryModel.find().populate('itemId').populate('userId');
};
exports.readAllInventorys = readAllInventorys;
const readAllInventoriesByUserId = async (userId) => {
    return await exports.InventoryModel.find({ userId }).populate('itemId').populate('userId');
};
exports.readAllInventoriesByUserId = readAllInventoriesByUserId;
const readInventoryByUserIdAndItemId = async (userId, itemId) => {
    return await exports.InventoryModel.findOne({ userId, itemId }).populate('itemId').populate('userId');
};
exports.readInventoryByUserIdAndItemId = readInventoryByUserIdAndItemId;
const readAllInventoriesByClerkId = async (clerkId) => {
    return await exports.InventoryModel.find({ clerkId }).populate('itemId');
};
exports.readAllInventoriesByClerkId = readAllInventoriesByClerkId;
const createInventory = async (inventory) => {
    const newInventory = new exports.InventoryModel(inventory);
    await newInventory.save();
    return newInventory;
};
exports.createInventory = createInventory;
//# sourceMappingURL=inventory.js.map