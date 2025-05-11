import multer from 'multer';
import { createItemController } from '../controllers/items';
import express from 'express';

const upload = multer({ dest: 'uploads/' });

export default function itemsRouter(router: express.Router) {
    router.post('/items', upload.single('image') , createItemController)
}