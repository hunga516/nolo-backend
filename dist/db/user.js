"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.readUserByClerkId = exports.deleteUserById = exports.updateUser = exports.createUser = exports.readUserByUserId = exports.getUserById = exports.getUserByEmail = exports.getUserByUsername = exports.getUsers = exports.UserModel = void 0;
const mongoose = __importStar(require("mongoose"));
const counter_1 = require("./counter");
const UserSchema = new mongoose.Schema({
    userId: { type: Number, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    clerkId: { type: String },
    imageUrl: { type: String },
    name: { type: String },
    coins: { type: Number, default: 0 },
    subscriberCount: { type: Number, default: 0 },
    isSubscriberSubscribed: { type: Boolean },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
    },
});
UserSchema.pre('save', async function (next) {
    if (this.isNew) {
        const counter = await counter_1.CounterModel.findOneAndUpdate({ model: 'User' }, { $inc: { count: 1 } }, { new: true, upsert: true });
        this.userId = counter.count;
    }
    next();
});
exports.UserModel = mongoose.model('User', UserSchema);
const getUsers = () => exports.UserModel.find();
exports.getUsers = getUsers;
const getUserByUsername = (username) => exports.UserModel.findOne({ username });
exports.getUserByUsername = getUserByUsername;
const getUserByEmail = (email) => exports.UserModel.findOne({ email });
exports.getUserByEmail = getUserByEmail;
const getUserById = (id) => exports.UserModel.findById(id);
exports.getUserById = getUserById;
const readUserByUserId = (userId) => exports.UserModel.findOne({ userId });
exports.readUserByUserId = readUserByUserId;
const createUser = (user) => new exports.UserModel(user).save().then((user) => user.toObject());
exports.createUser = createUser;
const updateUser = (id, { email }) => exports.UserModel.findByIdAndUpdate(id, { email }, { new: true });
exports.updateUser = updateUser;
const deleteUserById = (id) => exports.UserModel.findByIdAndDelete(id);
exports.deleteUserById = deleteUserById;
const readUserByClerkId = (clerkId) => {
    return exports.UserModel.findOne({ clerkId });
};
exports.readUserByClerkId = readUserByClerkId;
//# sourceMappingURL=user.js.map