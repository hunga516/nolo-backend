import express from 'express'
import { get, identity, merge } from 'lodash'

import { getUserBySessionToken } from '../db/users'

export const isOwner = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const { id } = req.params
        const currentUserId = get(req, 'identity._id') as string //as string khong co gia tri luc runtime

        if (!currentUserId) {
            return res.sendStatus(401)
        }

        if (currentUserId.toString() !== id) {
            //as string thi moi toString duoc
            return res.sendStatus(403)
        }

        return next()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const isAuthenticated = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const sessionToken = req.cookies['LENGOCLOC-AUTH']

        if (!sessionToken) {
            return res.sendStatus(500)
        }

        const existingUser = await getUserBySessionToken(sessionToken)

        if (!existingUser) {
            return res.sendStatus(401)
        }

        merge(req, { identity: existingUser })

        return next()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}
