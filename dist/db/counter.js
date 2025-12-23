"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CounterModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CounterSchema = new mongoose_1.default.Schema({
    model: { type: String, required: true, unique: true },
    count: { type: Number, default: 0 },
});
exports.CounterModel = mongoose_1.default.model('Counter', CounterSchema);
//# sourceMappingURL=counter.js.map