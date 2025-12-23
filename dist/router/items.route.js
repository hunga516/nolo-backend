"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = itemsRouter;
const multer_1 = __importDefault(require("multer"));
const items_controller_1 = require("../controllers/items.controller");
const inventory_1 = require("../db/inventory");
const user_1 = require("../db/user");
const item_1 = require("../db/item");
const upload = (0, multer_1.default)({ dest: 'uploads/' });
function itemsRouter(router) {
    router.post('/items', upload.single('image'), items_controller_1.createItemController);
    router.get('/items', items_controller_1.readAllItemsController);
    router.get('/items/:id', items_controller_1.readItemByIdController);
    router.post('/items/webhook', async (req, res, next) => {
        try {
            // req.body : {
            //     gateway: 'ACB',
            //     transactionDate: '2025-05-13 00:53:00',
            //     accountNumber: '28307897',
            //     subAccount: null,
            //     code: null,
            //     content: 'IB LE NGOC TAI chuyen khoan',
            //     transferType: 'in',
            //     description: 'BankAPINotify IB LE NGOC TAI chuyen khoan',
            //     transferAmount: 3000,
            //     referenceCode: '3079',
            //     accumulated: 0,
            //     id: 12741070
            // }
            console.log("webhook goc", req.body);
            const data = req.body.content;
            const newData = data.split("-").pop();
            const userId = Number(newData);
            // const itemName = newData[1]
            const existingUser = await (0, user_1.readUserByUserId)(userId);
            const existingItem = await (0, item_1.readItemByName)("null");
            if (!existingItem) {
                const existingUser = await (0, user_1.readUserByUserId)(userId);
                existingUser.coins += req.body.transferAmount;
                await existingUser.save();
                return res.json({
                    message: "So du tai khoan da duoc cap nhat",
                });
            }
            try {
                const existingInventory = await (0, inventory_1.readInventoryByUserIdAndItemId)(existingUser._id, existingItem._id);
                if (existingInventory) {
                    existingInventory.quantity += 1;
                    await existingInventory.save();
                    return res.json(existingInventory);
                }
                const newInventory = await (0, inventory_1.createInventory)({ userId: existingUser._id, itemId: existingItem._id });
                return res.json({
                    message: "Vat pham da duoc them thanh cong",
                    newInventory
                });
            }
            catch (error) {
                console.log();
                return res.status(400);
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
}
//# sourceMappingURL=items.route.js.map