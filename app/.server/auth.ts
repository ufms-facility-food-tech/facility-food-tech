import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia, TimeSpan } from "lucia";
import { db } from "~/.server/db/connection";
import { sessionTable, userTable } from "~/.server/db/schema";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export const auth = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(2, "w"),
});

declare module "lucia" {
  interface Lucia {
    Lucia: typeof auth;
  }
}
