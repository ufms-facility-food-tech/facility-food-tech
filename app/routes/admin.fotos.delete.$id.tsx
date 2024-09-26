import { rm } from "node:fs";
import { type ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { eq } from "drizzle-orm";
import { db } from "~/.server/db/connection";
import { imageMetadataTable } from "~/.server/db/schema";
import { auth, authMiddleware } from "~/.server/auth";

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
