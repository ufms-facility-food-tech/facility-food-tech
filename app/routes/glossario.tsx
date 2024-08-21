import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Container } from "~/components/container";
import { db } from "~/db.server/connection";
import { glossarioTable } from "~/db.server/schema";

export async function loader() {
  const glossary = await db.select().from(glossarioTable);

  return json(glossary);
}

export default function Faq() {
  const glossary = useLoaderData<typeof loader>();

  return (
    <Container title="Glossário">
      <ul className="flex flex-col gap-6">
        {glossary.map((item) => (
          <GlossaryListItem key={item.id} item={item} />
        ))}
      </ul>
    </Container>
  );
}

function GlossaryListItem({
  item,
}: {
  item: { name: string; definition: string; example: string };
}) {
  return (
    <li>
      <h2 className="text-xl font-bold">{item.name}</h2>
      <p>
        <strong>Definição</strong>: {item.definition}
      </p>
      <p>
        <strong>Exemplo</strong>: {item.example}
      </p>
    </li>
  );
}
