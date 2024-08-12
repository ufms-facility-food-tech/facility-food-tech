import {
  getFormProps,
  getInputProps,
  getTextareaProps,
  useForm,
} from "@conform-to/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { getValibotConstraint, parseWithValibot } from "conform-to-valibot";
import { TbPlus, TbTrash } from "react-icons/tb";
import {
  array,
  number,
  object,
  optional,
  string,
  boolean,
  pipe,
  transform,
  integer,
} from "valibot";
import {
  CheckboxInput,
  FormErrorMessage,
  SubmitButton,
  TextAreaInput,
  TextInput,
} from "~/components/form";
import { db } from "~/db.server/connection";
import {
  peptideoTable,
  organismoTable,
  funcaoBiologicaTable,
  publicacaoTable,
  caracteristicasAdicionaisTable,
  casoSucessoTable,
  nomePopularTable,
} from "~/db.server/schema";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithValibot(formData, { schema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const {
    organismo,
    funcaoBiologica,
    caracteristicasAdicionais,
    casoSucesso,
    publicacao,
    ...peptideo
  } = submission.value;

  let organismoId: number | undefined;
  if (!peptideo.sintetico && organismo) {
    const { nomesPopulares, ...restOfOrganismo } = organismo;
    const [{ insertedId }] = await db
      .insert(organismoTable)
      .values(restOfOrganismo)
      .returning({ insertedId: organismoTable.id });
    organismoId = insertedId;

    if (nomesPopulares !== undefined) {
      await db.insert(nomePopularTable).values(
        nomesPopulares.map((nomePopular) => ({
          nome: nomePopular,
          organismoId: insertedId,
        })),
      );
    }
  }

  const [{ peptideoId }] = await db
    .insert(peptideoTable)
    .values({
      ...peptideo,
      organismoId,
    })
    .returning({ peptideoId: peptideoTable.id });

  for (const { table, values } of [
    { table: funcaoBiologicaTable, values: funcaoBiologica },
    { table: casoSucessoTable, values: casoSucesso },
    {
      table: caracteristicasAdicionaisTable,
      values: caracteristicasAdicionais,
    },
  ]) {
    if (values && values.length > 0) {
      await db.insert(table).values(
        values.map((value) => ({
          peptideoId,
          value,
        })),
      );
    }
  }

  if (publicacao && publicacao.length > 0) {
    await db
      .insert(publicacaoTable)
      .values(
        publicacao.map(({ doi, titulo }) => ({
          peptideoId,
          doi,
          titulo,
        })),
      )
      // if DOI already exists, do nothing
      .onConflictDoNothing({ target: publicacaoTable.doi });
  }

  return submission.reply();
}

// TODO: use drizzle-valibot
// waiting for https://github.com/drizzle-team/drizzle-orm/pull/2481
const schema = object({
  identificador: optional(string()),
  sequencia: optional(string()),
  sintetico: optional(boolean()),
  descobertaLPPFB: optional(boolean()),
  quantidadeAminoacidos: optional(pipe(number(), integer())),
  massaMolecular: optional(
    pipe(
      number(),
      transform((num) => num.toString()),
    ),
  ),
  massaMolar: optional(
    pipe(
      number(),
      transform((num) => num.toString()),
    ),
  ),
  funcaoBiologica: optional(array(string())),
  microbiologia: optional(string()),
  atividadeAntifungica: optional(string()),
  ensaioCelular: optional(string()),
  propriedadesFisicoQuimicas: optional(string()),
  casoSucesso: optional(array(string())),
  caracteristicasAdicionais: optional(array(string())),
  publicacao: optional(
    array(
      object({
        doi: optional(string()),
        titulo: optional(string()),
      }),
    ),
  ),
  organismo: optional(
    object({
      nomeCientifico: optional(string()),
      origem: optional(string()),
      familia: optional(string()),
      nomesPopulares: optional(array(string())),
    }),
  ),
});

export default function InsertPanel() {
  const lastResult = useActionData<typeof action>();
  const [form, fields] = useForm({
    lastResult,
    constraint: getValibotConstraint(schema),
    onValidate({ formData }) {
      console.log(Object.fromEntries(formData));
      console.log(parseWithValibot(formData, { schema }));
      return parseWithValibot(formData, { schema });
    },
  });

  const organismo = fields.organismo.getFieldset();
  const nomesPopulares = organismo.nomesPopulares.getFieldList();
  const publicacao = fields.publicacao.getFieldList();
  const funcoesBiologicas = fields.funcaoBiologica.getFieldList();
  const casosSucesso = fields.casoSucesso.getFieldList();
  const caracteristicasAdicionais =
    fields.caracteristicasAdicionais.getFieldList();

  return (
    <>
      <Form
        method="post"
        {...getFormProps(form)}
        className="flex w-full flex-col gap-6"
      >
        <FormErrorMessage errors={form.errors} />
        <fieldset className="flex flex-col gap-3">
          <legend className="mb-3 w-full border-b-2 border-neutral-100 text-xl font-bold text-cyan-600">
            Peptídeo
          </legend>
          <CheckboxInput
            label="Descoberta LPPFB"
            {...getInputProps(fields.descobertaLPPFB, { type: "checkbox" })}
          />
          <TextInput
            label="Identificador"
            {...getInputProps(fields.identificador, { type: "text" })}
          />
          <FormErrorMessage errors={fields.identificador.errors} />
          <TextAreaInput
            label="Sequência"
            rows={4}
            {...getTextareaProps(fields.sequencia)}
          />
          <FormErrorMessage errors={fields.sequencia.errors} />
          <TextInput
            label="Massa molecular (Da)"
            {...getInputProps(fields.massaMolecular, { type: "text" })}
          />
          <FormErrorMessage errors={fields.massaMolecular.errors} />
          <TextInput
            label="Massa molar (g/mol)"
            {...getInputProps(fields.massaMolar, { type: "text" })}
          />
          <FormErrorMessage errors={fields.massaMolar.errors} />
          <TextInput
            label="Quantidade de Aminoácidos"
            {...getInputProps(fields.quantidadeAminoacidos, { type: "text" })}
          />
          <FormErrorMessage errors={fields.quantidadeAminoacidos.errors} />
          <TextAreaInput
            label="Ensaio celular"
            rows={6}
            {...getTextareaProps(fields.ensaioCelular)}
          />
          <FormErrorMessage errors={fields.ensaioCelular.errors} />
          <TextAreaInput
            label="Microbiologia"
            rows={6}
            {...getTextareaProps(fields.microbiologia)}
          />
          <FormErrorMessage errors={fields.microbiologia.errors} />
          <TextAreaInput
            label="Atividade antifúngica"
            rows={6}
            {...getTextareaProps(fields.atividadeAntifungica)}
          />
          <FormErrorMessage errors={fields.atividadeAntifungica.errors} />
          <TextAreaInput
            label="Propriedades físico-químicas"
            rows={6}
            {...getTextareaProps(fields.propriedadesFisicoQuimicas)}
          />
          <FormErrorMessage errors={fields.propriedadesFisicoQuimicas.errors} />
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <legend className="mb-3 w-full border-b-2 border-neutral-100 text-xl font-bold text-cyan-600">
            Dados do Organismo
          </legend>
          <CheckboxInput
            label="Sintético"
            {...getInputProps(fields.sintetico, { type: "checkbox" })}
          />
          <FormErrorMessage errors={fields.sintetico.errors} />
          <TextInput
            label="Espécie"
            {...getInputProps(organismo.nomeCientifico, { type: "text" })}
            disabled={fields.sintetico.value === "on"}
          />
          <FormErrorMessage errors={organismo.nomeCientifico.errors} />
          <TextInput
            label="Origem"
            {...getInputProps(organismo.origem, { type: "text" })}
            disabled={fields.sintetico.value === "on"}
          />
          <FormErrorMessage errors={organismo.origem.errors} />
          <TextInput
            label="Família"
            {...getInputProps(organismo.familia, { type: "text" })}
            disabled={fields.sintetico.value === "on"}
          />
          <FormErrorMessage errors={organismo.familia.errors} />

          <fieldset className="my-2 flex gap-2">
            <legend
              className="mb-2 flex w-full items-center gap-3 text-cyan-600 aria-disabled:text-neutral-500"
              aria-disabled={fields.sintetico.value === "on"}
            >
              Nomes Populares
              <button
                className="flex w-min items-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-500 px-2 py-1 text-sm font-bold text-white disabled:from-neutral-600 disabled:to-neutral-500"
                {...form.insert.getButtonProps({
                  name: organismo.nomesPopulares.name,
                })}
                disabled={fields.sintetico.value === "on"}
              >
                <TbPlus /> adicionar
              </button>
            </legend>
            <ul className="flex w-full flex-col gap-3">
              {nomesPopulares.map((nomePopular, index) => (
                <li key={nomePopular.key} className="flex flex-col">
                  <div className="flex-grow">
                    <TextInput
                      {...getInputProps(nomePopular, { type: "text" })}
                      disabled={fields.sintetico.value === "on"}
                    />
                  </div>
                  <FormErrorMessage errors={nomePopular.errors} />
                  <button
                    className="mt-2 flex w-min items-center gap-2 rounded-full bg-gradient-to-r from-red-800 to-red-700 px-2 py-1 text-sm font-bold text-white"
                    {...form.remove.getButtonProps({
                      name: organismo.nomesPopulares.name,
                      index,
                    })}
                  >
                    <TbTrash /> apagar
                  </button>
                </li>
              ))}
            </ul>
          </fieldset>
        </fieldset>

        <fieldset>
          <legend className="flex w-full items-center gap-4 border-b-2 border-neutral-100 text-xl font-bold text-cyan-600">
            Funções Biológicas
            <button
              className="my-2 flex w-min items-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-500 px-2 py-1 text-sm font-bold text-white"
              {...form.insert.getButtonProps({
                name: fields.funcaoBiologica.name,
              })}
            >
              <TbPlus /> adicionar
            </button>
          </legend>
          <ul className="mt-2 flex w-full flex-col gap-3">
            {funcoesBiologicas.map((funcaoBiologica, index) => {
              return (
                <li key={funcaoBiologica.key} className="flex flex-col">
                  <TextInput
                    {...getInputProps(funcaoBiologica, { type: "text" })}
                  />
                  <FormErrorMessage errors={funcaoBiologica.errors} />
                  <button
                    className="mt-2 flex w-min items-center gap-2 rounded-full bg-gradient-to-r from-red-800 to-red-700 px-2 py-1 text-sm font-bold text-white"
                    {...form.remove.getButtonProps({
                      name: fields.funcaoBiologica.name,
                      index,
                    })}
                  >
                    <TbTrash /> apagar
                  </button>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <fieldset>
          <legend className="flex w-full items-center gap-4 border-b-2 border-neutral-100 text-xl font-bold text-cyan-600">
            Publicações
            <button
              className="my-2 flex w-min items-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-500 px-2 py-1 text-sm font-bold text-white"
              {...form.insert.getButtonProps({
                name: fields.publicacao.name,
              })}
            >
              <TbPlus /> adicionar
            </button>
          </legend>
          {publicacao.map((item, index) => {
            const pub = item.getFieldset();
            return (
              <div
                key={item.key}
                className="m-2 flex flex-col gap-2 rounded-lg border border-neutral-100 p-2"
              >
                <TextInput
                  label="DOI"
                  {...getInputProps(pub.doi, { type: "text" })}
                />
                <FormErrorMessage errors={pub.doi.errors} />
                <TextInput
                  label="Título"
                  {...getInputProps(pub.titulo, { type: "text" })}
                />
                <FormErrorMessage errors={pub.titulo.errors} />
                <button
                  className="mt-2 flex w-min items-center gap-2 rounded-full bg-gradient-to-r from-red-800 to-red-700 px-2 py-1 text-sm font-bold text-white"
                  {...form.remove.getButtonProps({
                    name: fields.publicacao.name,
                    index,
                  })}
                >
                  <TbTrash /> apagar
                </button>
              </div>
            );
          })}
        </fieldset>

        <fieldset>
          <legend className="flex w-full items-center gap-4 border-b-2 border-neutral-100 text-xl font-bold text-cyan-600">
            Casos de Sucesso
            <button
              className="my-2 flex w-min items-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-500 px-2 py-1 text-sm font-bold text-white"
              {...form.insert.getButtonProps({
                name: fields.casoSucesso.name,
              })}
            >
              <TbPlus /> adicionar
            </button>
          </legend>
          <ul className="mt-2 flex w-full flex-col gap-3">
            {casosSucesso.map((caso, index) => {
              return (
                <li key={caso.key} className="flex flex-col">
                  <TextAreaInput
                    label={`Caso nº ${index + 1}`}
                    rows={4}
                    {...getTextareaProps(caso)}
                  />
                  <FormErrorMessage errors={caso.errors} />
                  <button
                    className="mt-2 flex w-min items-center gap-2 rounded-full bg-gradient-to-r from-red-800 to-red-700 px-2 py-1 text-sm font-bold text-white"
                    {...form.remove.getButtonProps({
                      name: fields.casoSucesso.name,
                      index,
                    })}
                  >
                    <TbTrash /> apagar
                  </button>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <fieldset>
          <legend className="flex w-full items-center gap-4 border-b-2 border-neutral-100 text-xl font-bold text-cyan-600">
            Características Adicionais
            <button
              className="my-2 flex w-min items-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-500 px-2 py-1 text-sm font-bold text-white"
              {...form.insert.getButtonProps({
                name: fields.caracteristicasAdicionais.name,
              })}
            >
              <TbPlus /> adicionar
            </button>
          </legend>
          <ul className="mt-2 flex w-full flex-col gap-3">
            {caracteristicasAdicionais.map((caracteristica, index) => {
              return (
                <li key={caracteristica.key} className="flex flex-col">
                  <TextAreaInput
                    label={`Característica nº ${index + 1}`}
                    rows={4}
                    {...getTextareaProps(caracteristica)}
                  />
                  <FormErrorMessage errors={caracteristica.errors} />
                  <button
                    className="mt-2 flex w-min items-center gap-2 rounded-full bg-gradient-to-r from-red-800 to-red-700 px-2 py-1 text-sm font-bold text-white"
                    {...form.remove.getButtonProps({
                      name: fields.caracteristicasAdicionais.name,
                      index,
                    })}
                  >
                    <TbTrash /> apagar
                  </button>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <FormErrorMessage errors={form.errors} />
        <div className="self-center">
          <SubmitButton>Enviar</SubmitButton>
        </div>
      </Form>
      {lastResult?.status === "success" ? (
        <p
          className={
            "my-4 rounded-xl bg-cyan-100 px-4 py-2 text-base text-cyan-700"
          }
        >
          Peptídeo inserido com sucesso.
        </p>
      ) : null}
    </>
  );
}
