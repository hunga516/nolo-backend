import express from 'express'
import { createUser, getUserByEmail, getUserByUsername } from '../db/users'
import { authentication, random } from '../helpers'

export const register = async (req: express.Request, res: express.Response) => {
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
