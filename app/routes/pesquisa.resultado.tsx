import {
  type ClientLoaderFunctionArgs,
  NavLink,
  json,
  useLoaderData,
} from "@remix-run/react";
import type { components } from "~/api-schema";
import { Container } from "~/components/container";
import { useNavigate } from "@remix-run/react";

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const url = new URL(request.url);

  const res = await fetch(
    `${url.origin}/api/query?${url.searchParams.toString()}`,
  );

  if (!res.ok) {
    console.error(res);
    return [];
  }

  return json(await res.json());
}

export default function Resultado() {
  const data = useLoaderData<typeof clientLoader>() as Array<
    components["schemas"]["PeptideoDTO"]
  >;

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
              <th scope="col" className="w-48 px-4 py-3">
                Nome popular
              </th>
              <th scope="col" className="w-60 px-4 py-3">
                Espécie
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
            {data.map(({ nomeIdentificador, sequencia, organismo, id }) => (
              <tr
                key={id}
                className="border-b odd:bg-neutral-50 even:bg-neutral-200"
              >
                <td className="px-4 py-4">{nomeIdentificador}</td>
                <td className="px-4 py-4">
                  {organismo?.nomePopular?.join(", ")}
                </td>
                <td className="px-4 py-4">
                  {organismo?.especie}
                </td>
                <td className="text-wrap px-4 py-4">
                  {sequencia && sequencia?.length > 15
                    ? sequencia?.slice(0, 15).concat("...")
                    : sequencia}
                </td>
                <td className="px-4 py-4">
                  <NavLink to={`/peptideo/${id}`} className="underline">
                    Visualizar
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
