"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readItemByIdController = exports.readAllItemsController = exports.createItemController = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const cloudinary_1 = __importDefault(require("../helpers/cloudinary"));
const item_1 = require("../db/item");
const createItemController = async (req, res, next) => {
    const { name, description, price } = req.body;
    const { file } = req;
    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    try {
        const uploadResult = await cloudinary_1.default.uploader
            .upload(req.file.path, {
            public_id: req.file.filename,
        });
        await promises_1.default.unlink(req.file.path);
        const newItem = new item_1.ItemModel({
            name,
            description,
            imageUrl: uploadResult.secure_url,
            price
        });
        await newItem.save();
        res.json({ message: 'Vật phẩm mới đã được thêm', item: newItem });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.createItemController = createItemController;
const readAllItemsController = async (req, res, next) => {
    try {
        const items = await (0, item_1.readAllItems)();
        res.json({ message: 'Lấy danh sách vật phẩm thành công', items });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.readAllItemsController = readAllItemsController;
const readItemByIdController = async (req, res, next) => {
    const { id } = req.params;
    try {
        const item = await (0, item_1.readItemById)(id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Lấy vật phẩm thành công', item });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.readItemByIdController = readItemByIdController;
//# sourceMappingURL=items.controller.js.map