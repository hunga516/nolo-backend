import express from 'express'
import { get, identity, merge } from 'lodash'
import jwt from 'jsonwebtoken'
import e from 'express'

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
        const authHeader = req.headers['authorization']
        if (!authHeader) {
            return res.sendStatus(401)
        }

        const token = authHeader.split(' ')[1]
        if (!token) {
            return res.sendStatus(401)
        }

        const userDecoded = jwt.verify(token, 'LENGOCLOC')

        merge(req, { identity: userDecoded })

        return next()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}
