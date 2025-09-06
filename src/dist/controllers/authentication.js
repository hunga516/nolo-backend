"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const user_1 = require("../db/user");
const helpers_1 = require("../helpers");
const lodash_1 = require("lodash");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = async (req, res, next) => {
    try {
        const { username, password, email, clerkId, imageUrl, name, } = req.body;
        if (!username || !password || !email) {
            return res.sendStatus(400);
        }
        const existingEmail = await (0, user_1.getUserByEmail)(email);
        if (existingEmail) {
            return res.sendStatus(400);
        }
        const existingUsername = await (0, user_1.getUserByUsername)(username);
        if (existingUsername) {
            return res.sendStatus(400);
        }
        const salt = (0, helpers_1.random)();
        const user = new user_1.UserModel({
            email,
            username,
            clerkId,
            imageUrl,
            name,
            authentication: {
                salt,
                password: (0, helpers_1.authentication)(salt, password),
            },
        });
        await user.save();
        return res.status(200).json(user.toObject()).end();
    }
    catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.sendStatus(400);
        }
        const existingUser = await (0, user_1.getUserByEmail)(email).select('+authentication.password +authentication.salt');
        if (!existingUser) {
            return res.sendStatus(403);
        }
        const expectedHash = (0, helpers_1.authentication)(existingUser.authentication.salt, password);
        if (expectedHash !== existingUser.authentication.password) {
            return res.sendStatus(403);
        }
        const salt = (0, helpers_1.random)();
        existingUser.authentication.salt = salt;
        existingUser.authentication.password = (0, helpers_1.authentication)(salt, password);
        await existingUser.save();
        (0, lodash_1.merge)(req, { identity: existingUser });
        const token = jsonwebtoken_1.default.sign(existingUser.toObject(), 'LENGOCLOC', { expiresIn: '1h' });
        res.status(200).json({
            user: existingUser,
            token
        }).end();
    }
    catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
};
exports.login = login;
//# sourceMappingURL=authentication.js.map