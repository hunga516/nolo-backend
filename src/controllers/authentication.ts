import express, { NextFunction, Request, Response } from 'express'
import { createUser, getUserByEmail, getUserByUsername } from '../db/user'
import { authentication, random } from '../helpers'
import { identity, merge } from 'lodash'
import jwt from 'jsonwebtoken'

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { username, password, email, clerkId, imageUrl, name, } = req.body
        if (!username || !password || !email) {
            return res.sendStatus(400)
        }

        const existingEmail = await getUserByEmail(email)
        if (existingEmail) {
            return res.sendStatus(400)
        }

        const existingUsername = await getUserByUsername(username)
        if (existingUsername) {
            return res.sendStatus(400)
        }

        const salt = random()
        const user = await createUser({
            email,
            username,
            clerkId,
            imageUrl,
            name,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        })

        return res.status(200).json(user).end()
    } catch (e) {
        console.log(e)
        return res.sendStatus(400)
    }
}

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.sendStatus(400)
        }

        const existingUser = await getUserByEmail(email).select(
            '+authentication.password +authentication.salt'
        )

        if (!existingUser) {
            return res.sendStatus(403)
        }

        const expectedHash = authentication(
            existingUser.authentication.salt,
            password
        )

        if (expectedHash !== existingUser.authentication.password) {
            return res.sendStatus(403)
        }

        const salt = random()
        existingUser.authentication.salt = salt
        existingUser.authentication.password = authentication(salt, password)
        await existingUser.save()

        merge(req, { identity: existingUser })

        const token = jwt.sign(existingUser.toObject(), 'LENGOCLOC', { expiresIn: '1h' })

        res.status(200).json({
            user: existingUser,
            token
        }).end()
    } catch (e) {
        console.log(e)
        return res.sendStatus(400)
    }
}
