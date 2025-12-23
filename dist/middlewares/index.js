"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = exports.isOwner = void 0;
const lodash_1 = require("lodash");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isOwner = async (req, res, next) => {
    try {
        const { id } = req.params;
        const currentUserId = (0, lodash_1.get)(req, 'identity._id'); //as string khong co gia tri luc runtime
        if (!currentUserId) {
            return res.sendStatus(401);
        }
        if (currentUserId.toString() !== id) {
            //as string thi moi toString duoc
            return res.sendStatus(403);
        }
        return next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.isOwner = isOwner;
const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.sendStatus(401);
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.sendStatus(401);
        }
        const userDecoded = jsonwebtoken_1.default.verify(token, 'LENGOCLOC');
        (0, lodash_1.merge)(req, { identity: userDecoded });
        return next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=index.js.map