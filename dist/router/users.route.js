"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = usersRoute;
const middlewares_1 = require("../middlewares");
const users_controller_1 = require("../controllers/users.controller");
function usersRoute(router) {
    router.get('/users', middlewares_1.isAuthenticated, users_controller_1.readAllUsersController);
    router.delete('/users/:id', middlewares_1.isAuthenticated, middlewares_1.isOwner, users_controller_1.deleteUserController);
    router.put('/users/:id', middlewares_1.isAuthenticated, middlewares_1.isOwner, users_controller_1.updateUserController);
    // router.get('/users/test', getUserPostGres)
    router.get('/users/clerk/:clerkId', users_controller_1.readUserByClerkIdController);
    router.post('/user/cid', users_controller_1.createCidController);
}
//# sourceMappingURL=users.route.js.map