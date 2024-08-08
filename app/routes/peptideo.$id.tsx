import {
  type ClientLoaderFunctionArgs,
  json,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import type { components } from "~/api-schema";
import { Container } from "~/components/container";

export async function clientLoader({ params }: ClientLoaderFunctionArgs) {
  const res = await fetch(`/api/peptideos/${params.id}`, {
    method: "GET",
  });

  if (!res.ok) {
    console.error(res);
    return {};
  }

  return json(await res.json());
}

export default function Peptideo() {
  const peptideo = useLoaderData<
    typeof clientLoader
  >() as components["schemas"]["PeptideoDTO"];

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
              <td className="px-6 py-4">{peptideo.organismo?.especie}</td>
            </tr>
            <tr className="border-b odd:bg-neutral-100 even:bg-neutral-300">
              <td className="px-6 py-4">Nomes populares</td>
              <td className="px-6 py-4">
                {peptideo.organismo?.nomePopular?.join(", ")}
              </td>
            </tr>
            <tr className="border-b odd:bg-neutral-100 even:bg-neutral-300">
              <td className="px-6 py-4">Família</td>
              <td className="px-6 py-4">{peptideo.organismo?.familia}</td>
            </tr>
            <tr className="border-b odd:bg-neutral-100 even:bg-neutral-300">
              <td className="px-6 py-4">Funções biológicas</td>
              <td className="px-6 py-4">
                {peptideo.funcaoBiologica?.join(", ")}
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
