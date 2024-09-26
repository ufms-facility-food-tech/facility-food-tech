import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import { auth } from "~/.server/auth";

export async function action({ request }: ActionFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const sessionId = auth.readSessionCookie(cookieHeader ?? "");
  if (!sessionId) {
    return redirect("/login");
  }

  await auth.invalidateSession(sessionId);
  const sessionCookie = auth.createBlankSessionCookie();
  return redirect("/login", {
    headers: {
      "Set-Cookie": sessionCookie.serialize(),
    },
  });
}
