"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authenticationRouter;
const authentication_1 = require("../controllers/authentication");
function authenticationRouter(router) {
    router.post('/auth/register', authentication_1.register);
    router.post('/auth/login', authentication_1.login);
    return router;
}
//# sourceMappingURL=authentication.js.map