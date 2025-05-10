import express from 'express'
import { db } from '../db/index'
import {usersTable} from '../db/schema'

import { deleteUserById, getUserById, getUsers, UserModel, updateUser } from '../db/users'
import { get } from 'lodash'

export const getAllUsers = async (
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

export const deleteUser = async (
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

export const editUser = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const { id } = req.params
        const { email } = req.body
        
        const user = await updateUser(id, {email})

        return res.status(200).json(user).end()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const getUserPostGres = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const data = await db.select().from(usersTable).limit(1)
        return res.status(200).json(data).end()
    }
    catch (error) {
        console.log(error)
    }
}
