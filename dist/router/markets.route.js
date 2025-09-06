"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.marketRoute = void 0;
const markets_controller_1 = require("../controllers/markets.controller");
const marketRoute = (route) => {
    route.post('/markets', markets_controller_1.createMarketController);
    route.post('/markets/purchase/:id', markets_controller_1.purchaseMarketController);
    route.get('/markets', markets_controller_1.readAllMarketsController);
};
exports.marketRoute = marketRoute;
//# sourceMappingURL=markets.route.js.map