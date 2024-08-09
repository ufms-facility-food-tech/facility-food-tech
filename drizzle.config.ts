import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./app/db.server/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE || "postgres",
    host: process.env.PGHOST || "localhost",
    port: Number(process.env.PGPORT),
    ssl: false,
  },
});
