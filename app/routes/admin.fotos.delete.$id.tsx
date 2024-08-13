import { json, redirect, type ActionFunctionArgs } from "@remix-run/node";
import { eq } from "drizzle-orm";
import { db } from "~/db.server/connection";
import { imageMetadataTable } from "~/db.server/schema";
import { rm } from "node:fs";

export async function action({ params }: ActionFunctionArgs) {
  const id = params.id;
  if (!id) {
    return json({ message: "Id inválido", ok: false });
  }
  //   try {
  //     await formData.get("csrfToken");
  //   }

  const metadata = await db.query.imageMetadataTable.findFirst({
    where: eq(imageMetadataTable.id, Number(id)),
  });

  if (!metadata) {
    return json({ message: "Imagem não encontrada", ok: false });
  }

  rm(
    `${process.env.UPLOAD_DIRECTORY}/images/upload/${metadata.fileName}`,
    (err) => {
      if (err) {
        console.error(err);
        return json({ message: "Falha ao excluir a imagem", ok: false });
      }
    },
  );

  await db
    .delete(imageMetadataTable)
    .where(eq(imageMetadataTable.id, metadata.id));

  return redirect("/admin/fotos");
}
