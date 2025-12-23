import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { createItemController, readAllItemsController, readItemByIdController } from '../controllers/items.controller';
import { createInventory, InventoryModel, readInventoryByUserIdAndItemId } from '../db/inventory';
import { readUserByUserId } from '../db/user';
import { UserModel } from '../db/user';
import { readItemById, readItemByName } from '../db/item';

const upload = multer({ dest: 'uploads/' });


export default function itemsRouter(router: express.Router) {
    router.post('/items', upload.single('image'), createItemController);
    router.get('/items', readAllItemsController);
    router.get('/items/:id', readItemByIdController);

    router.post('/items/webhook', async (req: Request, res: Response, next: NextFunction) => {
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

            console.log("webhook goc moi", req.body);


            // const data = req.body.content
            // const newData = data.split("-").pop()

            // const userId = Number(newData)
            // // const itemName = newData[1]
            // const existingUser = await readUserByUserId(userId)
            // const existingItem = await readItemByName("null")

            // if (!existingItem) {
            const existingUser = await readUserByUserId(8)
            existingUser.coins += req.body.transferAmount
            await existingUser.save()
            return res.json({
                message: "So du tai khoan da duoc cap nhat",
            });
            // }

            // try {
            //     const existingInventory = await readInventoryByUserIdAndItemId(existingUser._id, existingItem._id)

            //     if (existingInventory) {
            //         existingInventory.quantity += 1
            //         await existingInventory.save()
            //         return res.json(existingInventory)
            //     }

            //     const newInventory = await createInventory({ userId: existingUser._id, itemId: existingItem._id })

            //     return res.json({
            //         message: "Vat pham da duoc them thanh cong",
            //         newInventory
            //     })
            // } catch (error) {
            //     console.log();
            //     return res.status(400)
            // }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
}
