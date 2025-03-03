import express from 'express'
import authentication from './authentication'
import { register } from '../controllers/authentication'

const router = express.Router()

export default (): express.Router => {
    authentication(router)
    router.post('/auth/register-test', register)

    return router
}
