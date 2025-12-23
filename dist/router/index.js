"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setupRoutes;
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("./authentication"));
const items_route_1 = __importDefault(require("./items.route"));
const inventories_route_1 = __importDefault(require("./inventories.route"));
const users_route_1 = __importDefault(require("./users.route"));
const videos_route_1 = __importDefault(require("./videos.route"));
const markets_route_1 = require("./markets.route");
const router = express_1.default.Router();
function setupRoutes() {
    (0, authentication_1.default)(router);
    (0, users_route_1.default)(router);
    (0, items_route_1.default)(router);
    (0, inventories_route_1.default)(router);
    (0, videos_route_1.default)(router);
    (0, markets_route_1.marketRoute)(router);
    return router;
}
//# sourceMappingURL=index.js.map