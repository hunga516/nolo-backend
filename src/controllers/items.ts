import express from 'express';
import fs from 'fs/promises';
import cloudinary from '../helpers/cloudinary';
import { ItemModel } from '../db/items';

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