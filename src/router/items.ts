import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { createItemController, getAllItemsController, getItemByIdController } from '../controllers/items';

const upload = multer({ dest: 'uploads/' });


export default function itemsRouter(router: express.Router) {
    router.post('/items', upload.single('image'), createItemController);
    router.get('/items', getAllItemsController);
    router.get('/items/:id', getItemByIdController);

    router.post('/items/webhook', (req: Request, res: Response, next: NextFunction) => {
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
            
            
            res.status(200).json({ message: 'Webhook received' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
}
