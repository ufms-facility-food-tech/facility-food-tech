import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";

// connections will fallback to psql environment variables
// PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE
// https://www.postgresql.org/docs/current/libpq-envars.html
// but do no automatically get them from .env files
const connectionOptions = {
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
};

const migrationClient = postgres({
  max: 1,
  ...connectionOptions,
});
migrate(drizzle(migrationClient), { migrationsFolder: "./migrations" });

const queryClient = postgres({ ...connectionOptions });
const db = drizzle(queryClient, { schema });

export { db };
