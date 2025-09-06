"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCidController = exports.readUserByClerkIdController = exports.updateUserController = exports.deleteUserController = exports.readAllUsersController = void 0;
const express_1 = require("@clerk/express");
const user_1 = require("../db/user");
const readAllUsersController = async (req, res, next) => {
    try {
        const users = await (0, user_1.getUsers)();
        return res.status(200).json(users).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.readAllUsersController = readAllUsersController;
const deleteUserController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userDeleted = await (0, user_1.deleteUserById)(id);
        return res.status(200).json(userDeleted).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.deleteUserController = deleteUserController;
const updateUserController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { email } = req.body;
        const user = await (0, user_1.updateUser)(id, { email });
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.updateUserController = updateUserController;
const readUserByClerkIdController = async (req, res, next) => {
    const { clerkId } = req.params;
    try {
        const user = await (0, user_1.readUserByClerkId)(clerkId);
        res.json({
            message: 'lay thong tin ngoi dung thanh cong',
            user
        });
    }
    catch (error) {
        console.log(error);
        res.status(401);
    }
};
exports.readUserByClerkIdController = readUserByClerkIdController;
// export const readUserPostGresController = async (
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction
// ) => {
//     try {
//         const data = await db.select().from(usersTable).limit(1)
//         return res.status(200).json(data).end()
//     }
//     catch (error) {
//         console.log(error)
//     }
// }
const createCidController = async (req, res, next) => {
    const { cid, clerkId } = req.body;
    try {
        await express_1.clerkClient.users.updateUserMetadata(clerkId, {
            publicMetadata: {
                cid
            }
        });
        res.status(200).json("Xác thực thành công");
    }
    catch (error) {
        console.log(error);
        res.status(401);
    }
};
exports.createCidController = createCidController;
//# sourceMappingURL=users.controller.js.map