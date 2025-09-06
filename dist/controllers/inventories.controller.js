"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readAllInventoriesByUserIdIdController = exports.createInventoryController = void 0;
const inventory_1 = require("../db/inventory");
const createInventoryController = async (req, res, next) => {
    const { userId, itemId } = req.body;
    try {
        const existingInventory = await (0, inventory_1.readInventoryByUserIdAndItemId)(userId, itemId);
        if (existingInventory) {
            existingInventory.quantity += 1;
            await existingInventory.save();
            return res.json(existingInventory);
        }
        const newInventory = await (0, inventory_1.createInventory)({ userId, itemId });
        return res.json({
            message: "Vat pham da duoc them thanh cong",
            newInventory
        });
    }
    catch (error) {
        console.log();
        return res.status(400);
    }
};
exports.createInventoryController = createInventoryController;
const readAllInventoriesByUserIdIdController = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const inventories = await (0, inventory_1.readAllInventoriesByUserId)(userId);
        res.json({
            message: `Lay danh sach vat pham nguoi choi ${userId} thanh cong`,
            inventories
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400);
    }
};
exports.readAllInventoriesByUserIdIdController = readAllInventoriesByUserIdIdController;
//# sourceMappingURL=inventories.controller.js.map