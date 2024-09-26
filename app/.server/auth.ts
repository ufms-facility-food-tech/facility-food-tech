import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia, TimeSpan, verifyRequestOrigin } from "lucia";
import { db } from "~/.server/db/connection";
import { type User, sessionTable, userTable } from "~/.server/db/schema";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export const auth = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(2, "w"),
  // @ts-expect-error ??? the interface is right there
  getUserAttributes: (
    attributes: Pick<User, "email" | "displayName" | "role">,
  ) => ({
    email: attributes.email,
    displayName: attributes.displayName,
    role: attributes.role,
  }),
});

declare module "lucia" {
  interface Lucia {
    Lucia: typeof auth;
    DatabaseUserAttributes: Pick<User, "email" | "displayName" | "role">;
  }
}

export async function authMiddleware(request: Request) {
  if (request.method !== "GET") {
    const originHeader = request.headers.get("Origin");
    const hostHeader =
      request.headers.get("Host") ?? request.headers.get("X-Forwarded-Host");
    if (
      !originHeader ||
      !hostHeader ||
      !verifyRequestOrigin(originHeader, [hostHeader])
    ) {
      return { user: null, session: null };
    }
  }

  const cookieHeader = request.headers.get("Cookie");
  const sessionId = auth.readSessionCookie(cookieHeader ?? "");
  if (!sessionId) {
    return { user: null, session: null };
  }

  return await auth.validateSession(sessionId);
}
