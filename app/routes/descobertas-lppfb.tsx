import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { eq } from "drizzle-orm";
import { Container } from "~/components/container";
import { db } from "~/db.server/connection";
import { peptideoTable } from "~/db.server/schema";

export async function loader() {
  const descobertas = await db
    .select()
    .from(peptideoTable)
    .where(eq(peptideoTable.descobertaLPPFB, true));
  return json(descobertas);
}

export default function DescobertasLPPFB() {
  const descobertas = useLoaderData<typeof loader>();

  return (
    <Container title="Descobertas do LPPFB">
      {descobertas.map((descoberta) => (
        <div key={descoberta.id}>{descoberta.identificador}</div>
      ))}
    </Container>
  );
}
