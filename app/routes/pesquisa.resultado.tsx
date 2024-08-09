import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { NavLink, useLoaderData, useNavigate } from "@remix-run/react";
import { eq, like, or, sql } from "drizzle-orm";
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
      peptideoId: peptideoTable.id,
      nomeIdentificador: peptideoTable.nomeIdentificador,
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
      peptideoTable.nomeIdentificador,
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
        <p>{data.length} resultados encontrados</p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-full bg-neutral-100 px-6 py-2 text-lg font-bold outline outline-2 -outline-offset-2 outline-neutral-200 focus-visible:outline-inherit"
        >
          Voltar
        </button>
      </div>

      <div className="relative w-full overflow-x-auto rounded-lg outline outline-1">
        <table className="w-full text-left">
          <thead className="bg-neutral-100 text-lg font-bold outline outline-1">
            <tr>
              <th scope="col" className="w-12 px-4 py-3">
                Identificação
              </th>
              <th scope="col" className="w-60 px-4 py-3">
                Nome científico
              </th>
              <th scope="col" className="w-48 px-4 py-3">
                Nome popular
              </th>
              <th scope="col" className="w-96 px-4 py-3">
                Sequência
              </th>
              <th scope="col" className="px-4 py-3">
                Detalhes
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              ({
                nomeIdentificador,
                sequencia,
                nomeCientifico,
                nomesPopulares,
                peptideoId,
              }) => (
                <tr
                  key={peptideoId}
                  className="border-b odd:bg-neutral-50 even:bg-neutral-200"
                >
                  <td className="px-4 py-4">{nomeIdentificador}</td>
                  <td className="px-4 py-4 italic">{nomeCientifico}</td>
                  <td className="px-4 py-4">{nomesPopulares?.join(", ")}</td>
                  <td className="text-wrap px-4 py-4">
                    {sequencia && sequencia?.length > 15
                      ? sequencia?.slice(0, 15).concat("...")
                      : sequencia}
                  </td>
                  <td className="px-4 py-4">
                    <NavLink
                      to={`/peptideo/${peptideoId}`}
                      className="underline"
                    >
                      Visualizar
                    </NavLink>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
