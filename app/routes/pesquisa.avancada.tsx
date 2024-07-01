import { Form } from "@remix-run/react";
import { Container } from "~/components/container";
import { SubmitButton, TextAreaInput, TextInput } from "~/components/form";

export default function PesquisaAvancada() {
  return (
    <Container title="Pesquisa Avançada">
      <Form method="get" action="../resultado" className="flex flex-col gap-4">
        <fieldset>
          <legend className="mb-3 text-2xl text-cyan-700">Nomes</legend>
          <div className="mx-2 flex flex-col gap-4">
            <TextInput name="especie" label="Espécie" />
            <TextInput name="familia" label="Família" />
            <TextInput name="nomePopular" label="Nome Popular" />
            <TextAreaInput name="descricao" label="Descrição" />
          </div>
        </fieldset>
        {/* <fieldset>
          <legend className="mb-3 text-2xl text-cyan-700">
            Funções Biológicas
          </legend>
          <div className="mx-2 flex flex-col gap-4">
            <TextInput
              name="outrasFuncoesBiologicas"
              label="Outras Funções Biológicas"
            />
          </div>
        </fieldset> */}
        <fieldset>
          <legend className="mb-3 text-2xl text-cyan-700">
            Características Físicas
          </legend>
          <div className="mx-2 flex flex-col gap-4">
            <TextInput name="pesoMolecular" label="Peso Molecular" />
            <TextInput
              name="estruturaTridimensional"
              label="Estrutura Tridimensional"
            />
            <fieldset className="flex gap-8">
              <span className="text-xl text-cyan-700">
                Propriedades Físico-Químicas
              </span>
              <div className="flex-grow">
                <TextInput name="hidrofobicidade" label="Hidrofobicidade" />
                {/* <TextInput name="solubilidade" label="Solubilidade" /> */}
              </div>
            </fieldset>
          </div>
        </fieldset>
        {/* <TextInput name="alimento" label="Alimento" />
        <TextInput
          name="propriedadesNutricionais"
          label="Propriedades Nutricionais"
        /> */}
        <div className="mx-5 my-9 flex items-center justify-center gap-4">
          <SubmitButton>Pesquisar</SubmitButton>
        </div>
      </Form>
    </Container>
  );
}
