import { json, redirect, type ActionFunctionArgs } from "@remix-run/node";
import { eq } from "drizzle-orm";
import { db } from "~/db.server/connection";
import { glossarioTable } from "~/db.server/schema";

export async function action({ params }: ActionFunctionArgs) {
  const id = params.id;
  if (!id) {
    return json({ message: "Id inválido", ok: false });
  }
  //   try {
  //     await formData.get("csrfToken");
  //   }

  const item = await db.query.glossarioTable.findFirst({
    where: eq(glossarioTable.id, Number(id)),
  });

  if (!item) {
    return json({ message: "Item não encontrado", ok: false });
  }

  await db.delete(glossarioTable).where(eq(glossarioTable.id, item.id));

  return redirect("/admin/glossario");
}
