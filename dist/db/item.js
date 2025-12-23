"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readItemByName = exports.readItemById = exports.readAllItems = exports.ItemModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ItemSchema = new mongoose_1.default.Schema({
    name: { type: String },
    description: { type: String },
    imageUrl: { type: String },
    price: { type: Number, default: 0 },
}, {
    timestamps: true
});
exports.ItemModel = mongoose_1.default.model('Item', ItemSchema);
const readAllItems = () => exports.ItemModel.find();
exports.readAllItems = readAllItems;
const readItemById = (id) => exports.ItemModel.findById(id);
exports.readItemById = readItemById;
const readItemByName = (name) => exports.ItemModel.findOne({ name }).lean();
exports.readItemByName = readItemByName;
//# sourceMappingURL=item.js.map