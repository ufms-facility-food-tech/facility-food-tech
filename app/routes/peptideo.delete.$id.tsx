import { type ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { eq } from "drizzle-orm";
import { auth, authMiddleware } from "~/.server/auth";
import { db } from "~/.server/db/connection";
import { peptideoTable } from "~/.server/db/schema";

export async function action({ params, request }: ActionFunctionArgs) {
  const { session } = await authMiddleware(request);

  if (!session) {
    const sessionCookie = auth.createBlankSessionCookie();
    return redirect("/login", {
      headers: {
        "Set-Cookie": sessionCookie.serialize(),
      },
    });
  }

  if (session?.fresh) {
    const sessionCookie = auth.createSessionCookie(session.id);
    return redirect(request.url, {
      headers: {
        "Set-Cookie": sessionCookie.serialize(),
      },
    });
  }

  const id = params.id;
  if (!id) {
    return json({ message: "Id inválido", ok: false });
  }

  const item = await db.query.peptideoTable.findFirst({
    where: eq(peptideoTable.id, Number(id)),
  });

  if (!item) {
    return json({ message: "Peptídeo não encontrado", ok: false });
  }

  await db.delete(peptideoTable).where(eq(peptideoTable.id, item.id));

  return redirect("/admin/listar");
}
