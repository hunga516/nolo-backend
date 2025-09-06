"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
require("dotenv/config");
const neon_http_1 = require("drizzle-orm/neon-http");
if (!process.env.POSTGRESQL_DATABASE_URL) {
    throw new Error("POSTGRESQL_DATABASE_URL is not defined");
}
exports.db = (0, neon_http_1.drizzle)(process.env.POSTGRESQL_DATABASE_URL);
//# sourceMappingURL=index.js.map