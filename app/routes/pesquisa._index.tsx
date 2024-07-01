import { Form, NavLink } from "@remix-run/react";
import { useState } from "react";
import { Container } from "~/components/container";
import { SubmitButton, TextInput } from "~/components/form";

export default function Pesquisa() {
  const queryItems = [
    { value: "especie", label: "Espécie" },
    { value: "origem", label: "Origem" },
    { value: "familia", label: "Família" },
  ];

  const [queryItemName, setQueryItemName] = useState(queryItems[0].value);

  return (
    <Container title="Pesquisa">
      <Form className="flex flex-col gap-4" method="get" action="resultado">
        <QueryNameInput
          queryItems={queryItems}
          setQueryItemName={setQueryItemName}
        />
        <TextInput name={queryItemName} label="Pesquisar por" />
        <div className="mx-5 my-9 flex items-center justify-end gap-4">
          <NavLink to="avancada" className="text-cyan-700 underline">
            Fazer uma Pesquisa Avançada
          </NavLink>
          <SubmitButton>Pesquisar</SubmitButton>
        </div>
      </Form>
    </Container>
  );
}

function QueryNameInput({
  queryItems,
  setQueryItemName,
}: {
  queryItems: Array<{ value: string; label: string }>;
  setQueryItemName: (value: string) => void;
}) {
  return (
    <label className="flex flex-col text-xl text-cyan-700">
      Item de Pesquisa
      <select
        className="mt-1 rounded-xl border bg-white p-2 text-base text-black"
        onChange={(e) => setQueryItemName(e.target.value)}
      >
        {queryItems.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}
