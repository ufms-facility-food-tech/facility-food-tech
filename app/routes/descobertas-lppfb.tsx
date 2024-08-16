import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { eq, sql } from "drizzle-orm";
import { Container } from "~/components/container";
import { db } from "~/db.server/connection";
import {
  funcaoBiologicaTable,
  nomePopularTable,
  organismoTable,
  peptideoTable,
  organismoToNomePopularTable,
} from "~/db.server/schema";

export async function loader() {
  const descobertas = await db
    .select({
      sintetico: peptideoTable.sintetico,
      peptideoId: peptideoTable.id,
      identificador: peptideoTable.identificador,
      sequencia: peptideoTable.sequencia,
      nomeCientifico: organismoTable.nomeCientifico,
      nomesPopulares: sql<Array<string>>`array_agg(${nomePopularTable.nome})`,
      funcaoBiologica: sql<
        Array<string>
      >`array_agg(${funcaoBiologicaTable.value})`,
    })
    .from(peptideoTable)
    .leftJoin(organismoTable, eq(peptideoTable.organismoId, organismoTable.id))
    .leftJoin(
      organismoToNomePopularTable,
      eq(organismoTable.id, organismoToNomePopularTable.organismoId),
    )
    .leftJoin(
      nomePopularTable,
      eq(nomePopularTable.id, organismoToNomePopularTable.nomePopularId),
    )
    .leftJoin(
      funcaoBiologicaTable,
      eq(peptideoTable.id, funcaoBiologicaTable.peptideoId),
    )
    .where(eq(peptideoTable.descobertaLPPFB, true))
    .groupBy(
      peptideoTable.id,
      peptideoTable.identificador,
      peptideoTable.sequencia,
      organismoTable.nomeCientifico,
    );
  return json(descobertas);
}

export default function Resultado() {
  const descobertas = useLoaderData<typeof loader>();

  return (
    <Container>
      <p className="mt-4 text-sm text-neutral-800">
        {descobertas.length} registros
      </p>

      <ul className="mt-4 flex flex-col gap-6 rounded-lg bg-neutral-50 px-4 py-2 text-lg">
        {descobertas.map(
          ({
            peptideoId,
            identificador,
            sintetico,
            nomeCientifico,
            nomesPopulares,
            sequencia,
            funcaoBiologica,
          }) => (
            <li key={peptideoId} className="flex flex-col gap-1">
              <Link
                prefetch="intent"
                to={`/peptideo/${peptideoId}`}
                className="mt-1 text-2xl font-bold text-cyan-600 hover:underline"
              >
                {identificador ? identificador : "(sem identificador)"}
                {!sintetico ? (
                  nomeCientifico ? (
                    <i> - {nomeCientifico}</i>
                  ) : (
                    " - (sem nome científico)"
                  )
                ) : null}
              </Link>
              <p className="text-sm text-neutral-900">
                <b>Nome popular: </b>
                {nomesPopulares.filter((nome) => nome !== "NULL").length > 0
                  ? nomesPopulares?.join(", ")
                  : "(sem dados)"}
              </p>
              <p className="break-words text-sm text-neutral-900">
                <b>Sequência: </b>
                {sequencia ?? "(sem dados)"}
              </p>
              <p className="text-sm text-neutral-900">
                <b>Funções biológicas: </b>
                {funcaoBiologica.filter((value) => value !== "NULL").length > 0
                  ? funcaoBiologica?.join(", ")
                  : "(sem dados)"}
              </p>
            </li>
          ),
        )}
      </ul>
    </Container>
  );
}
