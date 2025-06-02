import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { createItemController, readAllItemsController, readItemByIdController } from '../controllers/items.controller';
import { createInventory, InventoryModel, readInventoryByUserIdAndItemId } from '../db/inventory';
import { readUserByUserId } from '../db/user';
import { UserModel } from 'db/user';

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

            const userId = 7
            const itemId = "683dd4b0aa3f5db539b03839"
            const existingUser = await readUserByUserId(userId)

            try {
                const existingInventory = await readInventoryByUserIdAndItemId(existingUser._id, itemId)

                if (existingInventory) {
                    existingInventory.quantity += 1
                    await existingInventory.save()
                    return res.json(existingInventory)
                }

                const newInventory = await createInventory({ userId: existingUser._id, itemId })

                return res.json({
                    message: "Vat pham da duoc them thanh cong",
                    newInventory
                })
            } catch (error) {
                console.log();
                return res.status(400)
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
}
