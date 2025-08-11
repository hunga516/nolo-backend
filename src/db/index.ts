import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';

if (!process.env.POSTGRESQL_DATABASE_URL) {
    throw new Error("POSTGRESQL_DATABASE_URL is not defined");
}

export const db = drizzle(process.env.POSTGRESQL_DATABASE_URL);
