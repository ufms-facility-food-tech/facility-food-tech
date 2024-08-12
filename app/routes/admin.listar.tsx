import { NavLink, useLoaderData } from "@remix-run/react";
import { db } from "../db.server/connection";

export async function loader() {
  return await db.query.peptideoTable.findMany({
    columns: {
      id: true,
      identificador: true,
      sequencia: true,
    },
    with: {
      organismo: {
        columns: {
          nomeCientifico: true,
        },
        with: {
          nomePopular: true,
        },
      },
    },
  });
}

export default function ListPanel() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <div className="m-4 flex items-center justify-between">
        <p>{data.length} registros encontrados</p>
      </div>

      <div className="relative w-full overflow-x-auto rounded-lg outline outline-1">
        <table className="w-full text-left">
          <thead className="bg-neutral-100 text-lg font-bold outline outline-1">
            <tr>
              <th scope="col" className="w-12 px-4 py-3">
                Identificador
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
            {data.map(({ identificador, sequencia, organismo, id }) => (
              <tr
                key={id}
                className="border-b odd:bg-neutral-50 even:bg-neutral-200"
              >
                <td className="px-4 py-4">{identificador}</td>
                <td className="px-4 py-4 italic">
                  {organismo?.nomeCientifico}
                </td>
                <td className="px-4 py-4">
                  {organismo?.nomePopular?.map(({ nome }) => nome).join(", ")}
                </td>
                <td className="text-wrap px-4 py-4">
                  {sequencia && sequencia?.length > 20
                    ? sequencia?.slice(0, 20).concat("...")
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
    </>
  );
}
