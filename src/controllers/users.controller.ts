import express from 'express'
import { db } from '../db/index'
import { usersTable } from '../db/schema'
import { clerkClient } from '@clerk/express'

import { deleteUserById, getUserById, getUsers, UserModel, updateUser, readUserByClerkId } from '../db/user'

export const readAllUsersController = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const users = await getUsers()

        return res.status(200).json(users).end()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const deleteUserController = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const { id } = req.params
        const userDeleted = await deleteUserById(id)

        return res.status(200).json(userDeleted).end()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const updateUserController = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const { id } = req.params
        const { email } = req.body

        const user = await updateUser(id, { email })

        return res.status(200).json(user).end()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const readUserByClerkIdController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { clerkId } = req.params

    try {
        const user = await readUserByClerkId(clerkId)

        res.json({
            message: 'lay thong tin ngoi dung thanh cong',
            user
        })
    } catch (error) {
        console.log(error);
        res.status(401)
    }
}


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

export const createCidController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { cid, clerkId } = req.body

    try {
        await clerkClient.users.updateUserMetadata(clerkId, {
            publicMetadata: {
                cid
            }
        })
        res.status(200).json("Xác thực thành công")
    } catch (error) {
        console.log(error);
        res.status(401)
    }
}
