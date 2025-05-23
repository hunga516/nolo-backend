import express from 'express'
import { login, register } from '../controllers/authentication'

export default function authenticationRouter(router: express.Router): express.Router {
    router.post('/auth/register', register)
    router.post('/auth/login', login)
    return router
}
