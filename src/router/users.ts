import express from 'express'
import { deleteUser, getAllUsers,getUserPostGres, editUser } from '../controllers/users'
import { isAuthenticated, isOwner } from '../middlewares'

export default function userRoute(router: express.Router) {
    router.get('/users', isAuthenticated, getAllUsers)
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser)
    router.put('/users/:id', isAuthenticated, isOwner, editUser)
    // router.get('/users/test', getUserPostGres)
}
