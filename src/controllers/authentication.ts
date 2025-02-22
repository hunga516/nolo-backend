import express, { NextFunction, Request, Response } from 'express'
import { createUser, getUserByEmail, getUserByUsername } from '../db/users'
import { authentication, random } from '../helpers'

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { username, password, email } = req.body
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
        existingUser.authentication.sessionToken = authentication(
            salt,
            existingUser._id.toString()
        )
        await existingUser.save()

        res.cookie('LENGOCLOC-AUTH', existingUser.authentication.sessionToken, {
            domain: 'localhost',
            path: '/',
        })

        res.status(200).json(existingUser).end()
    } catch (e) {
        console.log(e)
        return res.sendStatus(400)
    }
}
