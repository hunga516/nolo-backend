import express from 'express'
import { getUserByEmail, getUserByUsername } from '../db/users'

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
    } catch (e) {
        console.log(e)
        return res.sendStatus(400)
    }
}
