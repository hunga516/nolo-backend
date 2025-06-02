import { createInventoryController, readAllInventoriesByUserIdIdController, } from '../controllers/inventories.controller';
import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });


export default function inventoriesRouter(router: express.Router) {
    router.post('/inventories', createInventoryController);
    // router.get('/inventories', getAllinventoriesController);
    router.get('/inventories/users/:userId', readAllInventoriesByUserIdIdController);
}
