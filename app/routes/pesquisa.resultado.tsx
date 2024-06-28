import {
  type ClientLoaderFunctionArgs,
  json,
  useLoaderData,
} from "@remix-run/react";
import { Container } from "~/components/container";
import { Table } from "~/components/table";

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const url = new URL(request.url);

  const res = await fetch(
    `${url.origin}/api/organismos/query?${url.searchParams.toString()}`,
  );

  if (!res.ok) {
    console.log(res);
    return [];
  }

  return json(await res.json());
}

export default function Resultado() {
  const data = useLoaderData<typeof clientLoader>();
  console.log(data);

  return (
    <Container>
      <Table
        tableHeader={[
          { propertyName: "especie", label: "Espécie" },
          { propertyName: "origem", label: "Origem" },
          { propertyName: "familia", label: "Família" },
          { propertyName: "nomeCientifico", label: "Nome Científico" },
        ]}
        data={data}
      />
    </Container>
  );
}
