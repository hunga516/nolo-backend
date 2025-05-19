import express from 'express';
import fs from 'fs/promises';
import cloudinary from '../helpers/cloudinary';
import { ItemModel, readAllItems, readItemById } from '../db/item';

export const createItemController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { name, description } = req.body;
    const { file } = req;

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, {
            public_id: req.file.filename,
            })  

        await fs.unlink(req.file.path)

        const newItem = new ItemModel({
            name,
            description,
            imageUrl: uploadResult.secure_url,
        })
        await newItem.save();

        res.json({ message: 'Vật phẩm mới đã được thêm', item: newItem });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const readAllItemsController = async (req: express.Request, res: express.Response, next: express.NextFunction) => { 
    try {
        const items = await readAllItems();
        res.json({message: 'Lấy danh sách vật phẩm thành công', items});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const readItemByIdController = async (req: express.Request, res: express.Response, next: express.NextFunction) => { 
    const { id } = req.params;
    try {
        const item = await readItemById(id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Lấy vật phẩm thành công', item });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}