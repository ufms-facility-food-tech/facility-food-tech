import { type ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { eq } from "drizzle-orm";
import { db } from "~/.server/db/connection";
import { peptideoTable } from "~/.server/db/schema";

export async function action({ params }: ActionFunctionArgs) {
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
