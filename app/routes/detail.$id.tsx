import {
  type ClientLoaderFunctionArgs,
  json,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import type { components } from "~/api-schema";
import { Container } from "~/components/container";

export async function clientLoader({
  request,
  params,
}: ClientLoaderFunctionArgs) {
  const url = new URL(request.url);

  const peptideo = await fetch(`${url.origin}/api/peptideos/${params.id}`);

  if (!peptideo.ok) {
    return {};
  }

  return json(await peptideo.json());
}

export default function Peptideo() {
  // @ts-ignore
  const peptideo = useLoaderData<
    typeof clientLoader
  >() as components["schemas"]["PeptideoDTO"];

  const navigate = useNavigate();
  return (
    <Container title="Peptideo">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-4 text-cyan-700 underline"
      >
        &lt; Voltar
      </button>
      <div className="relative my-2 w-full overflow-x-auto rounded-lg outline outline-1">
        <table className="w-full text-left">
          <thead className="bg-white text-lg outline outline-1">
            <tr>
              <th scope="col" className="px-6 py-3 font-normal">
                Detalhes
              </th>
              <th scope="col" className="px-6 py-3 font-normal" />
            </tr>
          </thead>
          <tbody>
            <tr className="border-b odd:bg-neutral-100 even:bg-neutral-300">
              <td className="px-6 py-4">Peptídeo</td>
              <td className="px-6 py-4">{peptideo.peptideo}</td>
            </tr>
            <tr className="border-b odd:bg-neutral-100 even:bg-neutral-300">
              <td className="px-6 py-4">Sequência</td>
              <td className="px-6 py-4">{peptideo.sequencia}</td>
            </tr>
            <tr className="border-b odd:bg-neutral-100 even:bg-neutral-300">
              <td className="px-6 py-4">Tipo de peptídeo</td>
              <td className="px-6 py-4">{peptideo.tipoPeptideo}</td>
            </tr>
            <tr className="border-b odd:bg-neutral-100 even:bg-neutral-300">
              <td className="px-6 py-4">Espécie</td>
              <td className="px-6 py-4">{peptideo.organismo?.especie}</td>
            </tr>
            <tr className="border-b odd:bg-neutral-100 even:bg-neutral-300">
              <td className="px-6 py-4">Nomes populares</td>
              <td className="px-6 py-4">
                {peptideo.organismo?.nomesPopulares
                  ?.map(({ nome }) => nome)
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
                {peptideo.funcBiologicas
                  ?.map((item) => item.descricao)
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
