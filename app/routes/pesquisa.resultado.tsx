import {
  type ClientLoaderFunctionArgs,
  json,
  NavLink,
  NavLink,
  useLoaderData,
} from "@remix-run/react";
import type { components } from "~/api-schema";
import type { components } from "~/api-schema";
import { Container } from "~/components/container";

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

  const tableHeader = [
    { propertyName: "peptideo", label: "Peptideo" },
    { propertyName: "sequencia", label: "Sequencia" },
    { propertyName: "funcBiologicas", label: "Funcoes Biologicas" },
    { propertyName: "familia", label: "Familia" },
    { propertyName: "especie", label: "Especie" },
  ] as const;

  return (
    <Container>
      <div className="relative w-full overflow-x-auto rounded-lg outline outline-1">
        <table className="w-full text-left">
          <thead className="bg-white text-lg outline outline-1">
            <tr>
              {tableHeader.map(({ propertyName, label }) => (
                <th
                  key={propertyName}
                  scope="col"
                  className="px-6 py-3 font-normal"
                >
                  {label}
                </th>
              ))}
              <th scope="col" className="px-6 py-3 font-normal">
                Detalhes
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              ({ peptideo, sequencia, funcBiologicas, organismo, id }) => (
                <tr
                  key={id}
                  className="border-b odd:bg-neutral-100 even:bg-neutral-300"
                >
                  <td className="px-4 py-4">{peptideo}</td>
                  <td className="px-4 py-4">
                    {sequencia && sequencia?.length > 15
                      ? sequencia?.slice(0, 15).concat("...")
                      : sequencia}
                  </td>
                  <td className="px-4 py-4">
                    {funcBiologicas?.map((func) => func.descricao).join(", ")}
                  </td>
                  <td className="px-4 py-4">{organismo?.familia}</td>
                  <td className="px-4 py-4">{organismo?.especie}</td>
                  <td className="px-4 py-4">
                    <NavLink to={`/detail/${id}`} className="underline">
                      Ver detalhes
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
