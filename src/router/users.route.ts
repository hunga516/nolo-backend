import express from 'express'
import { isAuthenticated, isOwner } from '../middlewares'
import { deleteUserController, readAllUsersController, readUserByClerkIdController, updateUserController } from '../controllers/users.controller'

export default function usersRoute(router: express.Router) {
    router.get('/users', isAuthenticated, readAllUsersController)
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUserController)
    router.put('/users/:id', isAuthenticated, isOwner, updateUserController)
    // router.get('/users/test', getUserPostGres)
    router.get('/users/clerk/:clerkId', readUserByClerkIdController)
}
