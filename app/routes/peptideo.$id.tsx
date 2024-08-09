import { useLoaderData, useNavigate } from "@remix-run/react";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Container } from "~/components/container";
import { db } from "~/db.server/connection";
import { eq } from "drizzle-orm";
import { peptideoTable } from "~/db.server/schema";

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  const peptideo = await db.query.peptideoTable.findFirst({
    where: eq(peptideoTable.id, Number(id)),
    with: {
      organismo: true,
      funcaoBiologica: true,
      microbiologia: true,
      atividadeAntifungica: true,
      atividadeCelular: true,
      propriedadesFisicoQuimicas: true,
      casoSucesso: true,
      caracteristicasAdicionais: true,
      publicacao: true,
    },
  });

  return json(peptideo);
}

export default function Peptideo() {
  const peptideo = useLoaderData<typeof loader>();

  const navigate = useNavigate();
  return (
    <Container title="Peptideo">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-4 text-cyan-600 underline"
      >
        &lt; Voltar
      </button>
      <div className="relative my-2 w-full overflow-x-auto rounded-lg outline outline-1">
        <table className="w-full text-left">
          <thead className="bg-white text-lg outline outline-1">
            <tr>
              <th scope="col" className="w-1/6 px-6 py-3">
                Detalhes
              </th>
              <th scope="col" className="w-5/6" />
            </tr>
          </thead>
          <tbody>
            <tr className="border-b odd:bg-neutral-100 even:bg-neutral-300">
              <td className="px-6 py-4">Peptídeo</td>
              <td className="px-6 py-4">{peptideo.nomeIdentificador}</td>
            </tr>
            <tr className="border-b odd:bg-neutral-100 even:bg-neutral-300">
              <td className="px-6 py-4">Sequência</td>
              <td className="px-6 py-4">{peptideo.sequencia}</td>
            </tr>
            <tr className="border-b odd:bg-neutral-100 even:bg-neutral-300">
              <td className="px-6 py-4">Espécie</td>
              <td className="px-6 py-4">
                {peptideo.organismo?.nomeCientifico}
              </td>
            </tr>
            <tr className="border-b odd:bg-neutral-100 even:bg-neutral-300">
              <td className="px-6 py-4">Nomes populares</td>
              <td className="px-6 py-4">
                {peptideo.organismo?.nomesPopulares
                  ?.map((nome) => nome)
                  .join(", ")}
              </td>
            </tr>
            <tr className="border-b odd:bg-neutral-100 even:bg-neutral-300">
              <td className="px-6 py-4">Família</td>
              <td className="px-6 py-4">{peptideo.organismo?.familia}</td>
            </tr>
            <tr className="border-b odd:bg-neutral-100 even:bg-neutral-300">
              <td className="px-6 py-4">Funções biológicas</td>
              <td className="px-6 py-4">
                {peptideo.funcaoBiologica
                  .map((funcao) => funcao.value)
                  .join(", ")}
              </td>
            </tr>
            <tr className="border-b odd:bg-neutral-100 even:bg-neutral-300">
              <td className="px-6 py-4">Massa molecular</td>
              <td className="px-6 py-4">{peptideo.massaMolecular}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Container>
  );
}
