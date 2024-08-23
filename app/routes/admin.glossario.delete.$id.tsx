import { type ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { eq } from "drizzle-orm";
import { db } from "~/.server/db/connection";
import { glossarioTable } from "~/.server/db/schema";

export async function action({ params }: ActionFunctionArgs) {
  const id = params.id;
  if (!id) {
    return json({ message: "Id inválido", ok: false });
  }

  const item = await db.query.glossarioTable.findFirst({
    where: eq(glossarioTable.id, Number(id)),
  });

  if (!item) {
    return json({ message: "Item não encontrado", ok: false });
  }

  await db.delete(glossarioTable).where(eq(glossarioTable.id, item.id));

  return redirect("/admin/glossario");
}
