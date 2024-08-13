import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { NavLink, useLoaderData, useNavigate } from "@remix-run/react";
import { eq, like, or, sql } from "drizzle-orm";
import { TbFlaskFilled } from "react-icons/tb";
import { Container } from "~/components/container";
import { db } from "~/db.server/connection";
import {
  organismoTable,
  peptideoTable,
  casoSucessoTable,
  nomePopularTable,
} from "~/db.server/schema";

export async function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);

  const nomePopular = searchParams.get("nomePopular");
  const nomeCientifico = searchParams.get("nomeCientifico");
  const origem = searchParams.get("origem");
  const familia = searchParams.get("familia");
  const casoSucesso = searchParams.get("casoSucesso");

  const likes = [
    nomePopular ? like(nomePopularTable.nome, `%${nomePopular}%`) : null,
    nomeCientifico
      ? like(organismoTable.nomeCientifico, `%${nomeCientifico}%`)
      : null,
    origem ? like(organismoTable.origem, `%${origem}%`) : null,
    familia ? like(organismoTable.familia, `%${familia}%`) : null,
    casoSucesso ? like(casoSucessoTable.value, `%${casoSucesso}%`) : null,
  ].filter((like) => like !== null);

  const results = await db
    .select({
      descobertaLPPFB: peptideoTable.descobertaLPPFB,
      sintetico: peptideoTable.sintetico,
      peptideoId: peptideoTable.id,
      identificador: peptideoTable.identificador,
      sequencia: peptideoTable.sequencia,
      nomeCientifico: organismoTable.nomeCientifico,
      nomesPopulares: sql<Array<string>>`array_agg(${nomePopularTable.nome})`,
    })
    .from(peptideoTable)
    .leftJoin(
      casoSucessoTable,
      eq(peptideoTable.id, casoSucessoTable.peptideoId),
    )
    .leftJoin(organismoTable, eq(peptideoTable.organismoId, organismoTable.id))
    .leftJoin(
      nomePopularTable,
      eq(nomePopularTable.organismoId, organismoTable.id),
    )
    .where(or(...likes))
    .groupBy(
      peptideoTable.id,
      peptideoTable.identificador,
      peptideoTable.sequencia,
      organismoTable.nomeCientifico,
    );

  return json(results);
}

export default function Resultado() {
  const data = useLoaderData<typeof loader>();

  const navigate = useNavigate();
  return (
    <Container>
      <div className="m-4 flex items-center justify-between">
        <p className="text-sm text-neutral-800">
          {data.length} resultados encontrados
        </p>
        <button
          type="button"
          className="w-min self-center rounded-full bg-neutral-100 px-6 py-2 text-lg font-bold"
          onClick={() => navigate(-1)}
        >
          Voltar
        </button>
      </div>

      <ul className="m-4 flex flex-col gap-6 rounded-lg bg-neutral-50 px-4 py-2 text-lg">
        {data.map(
          ({
            peptideoId,
            identificador,
            sintetico,
            nomeCientifico,
            nomesPopulares,
            sequencia,
            descobertaLPPFB,
          }) => (
            <li key={peptideoId} className="flex flex-col gap-1">
              <NavLink
                to={`/peptideo/${peptideoId}`}
                className="text-2xl font-bold text-cyan-600 hover:underline"
              >
                {identificador ? identificador : "(sem identificador)"}{" "}
                {!sintetico ? (
                  nomeCientifico ? (
                    <i>- {nomeCientifico}</i>
                  ) : (
                    "- (sem nome científico)"
                  )
                ) : null}
              </NavLink>
              {descobertaLPPFB ? (
                <div className="flex w-fit items-center gap-2 rounded-2xl bg-gradient-to-br from-cyan-600 to-cyan-500 px-2 text-sm font-bold text-white">
                  <TbFlaskFilled /> Descoberta do LPPFB
                </div>
              ) : null}
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
            </li>
          ),
        )}
      </ul>
    </Container>
  );
}
