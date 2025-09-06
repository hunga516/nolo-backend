"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = inventoriesRouter;
const inventories_controller_1 = require("../controllers/inventories.controller");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: 'uploads/' });
function inventoriesRouter(router) {
    router.post('/inventories', inventories_controller_1.createInventoryController);
    // router.get('/inventories', getAllinventoriesController);
    router.get('/inventories/users/:userId', inventories_controller_1.readAllInventoriesByUserIdIdController);
}
//# sourceMappingURL=inventories.route.js.map