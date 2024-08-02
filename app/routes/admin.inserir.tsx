import {
  getFormProps,
  getInputProps,
  getTextareaProps,
  useForm,
} from "@conform-to/react";
import {
  type ClientActionFunctionArgs,
  Form,
  useActionData,
} from "@remix-run/react";
import { getValibotConstraint, parseWithValibot } from "conform-to-valibot";
import { TbPlus, TbTrash } from "react-icons/tb";
import {
  pipe,
  array,
  maxLength,
  number,
  object,
  optional,
  string,
} from "valibot";
import {
  FormErrorMessage,
  SubmitButton,
  TextAreaInput,
  TextInput,
} from "~/components/form";

const schema = object({
  nomeIdentificador: optional(pipe(string(), maxLength(255))),
  sequencia: optional(pipe(string(), maxLength(4095))),
  sintetizado: optional(string()),
  resultadoInterno: optional(string()),
  quantidadeAminoacidos: optional(number()),
  massaMolecular: optional(number()),
  massaMolar: optional(number()),
  funcaoBiologica: optional(array(pipe(string(), maxLength(255)))),
  microbiologia: optional(array(pipe(string(), maxLength(255)))),
  atividadeAntifungica: optional(array(pipe(string(), maxLength(255)))),
  atividadeCelular: optional(array(pipe(string(), maxLength(255)))),
  propriedadesFisicoQuimicas: optional(array(pipe(string(), maxLength(255)))),
  casoSucesso: optional(array(pipe(string(), maxLength(255)))),
  caracteristicasAdicionais: optional(array(pipe(string(), maxLength(255)))),
  publicacao: optional(
    array(object({ doi: optional(string()), titulo: optional(string()) })),
  ),
  organismo: optional(
    object({
      especie: optional(pipe(string(), maxLength(255))),
      origem: optional(pipe(string(), maxLength(255))),
      familia: optional(pipe(string(), maxLength(255))),
      nomePopular: optional(array(pipe(string(), maxLength(255)))),
    }),
  ),
});

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithValibot(formData, { schema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const res = await fetch("/api/peptideos", {
    method: "POST",
    body: JSON.stringify(submission.value),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    return submission.reply({
      formErrors: [
        "Erro ao inserir peptídeo.",
        `${res.status} - ${res.statusText.toUpperCase()}`,
      ],
    });
  }
  return submission.reply({
    formErrors: [],
  });
}

export default function InsertPanel() {
  const lastResult = useActionData<typeof clientAction>();
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
  const nomesPopulares = organismo.nomePopular.getFieldList();
  const publicacao = fields.publicacao.getFieldList();
  const funcoesBiologicas = fields.funcaoBiologica.getFieldList();
  const microbiologias = fields.microbiologia.getFieldList();
  const atividadesAntifungicas = fields.atividadeAntifungica.getFieldList();
  const atividadesCelulares = fields.atividadeCelular.getFieldList();
  const propriedadesFisicoQuimicas =
    fields.propriedadesFisicoQuimicas.getFieldList();
  const casosSucesso = fields.casoSucesso.getFieldList();
  const caracteristicasAdicionais =
    fields.caracteristicasAdicionais.getFieldList();

  return (
    <Form
      method="post"
      {...getFormProps(form)}
      className="flex w-full flex-col gap-6"
    >
      <FormErrorMessage errors={form.errors} />
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-3 w-full border-b-2 border-neutral-100 text-xl font-bold text-cyan-600">
          Peptídeo
        </legend>
        <TextInput
          label="Identificação"
          {...getInputProps(fields.nomeIdentificador, { type: "text" })}
        />
        <FormErrorMessage errors={fields.nomeIdentificador.errors} />
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
      </fieldset>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-3 w-full border-b-2 border-neutral-100 text-xl font-bold text-cyan-600">
          Dados do Organismo
        </legend>
        <TextInput
          label="Espécie"
          {...getInputProps(organismo.especie, { type: "text" })}
        />
        <FormErrorMessage errors={organismo.especie.errors} />
        <TextInput
          label="Origem"
          {...getInputProps(organismo.origem, { type: "text" })}
        />
        <FormErrorMessage errors={organismo.origem.errors} />
        <TextInput
          label="Família"
          {...getInputProps(organismo.familia, { type: "text" })}
        />
        <FormErrorMessage errors={organismo.familia.errors} />

        <fieldset className="my-2 flex gap-2">
          <legend className="mb-2 flex w-full items-center gap-3 text-cyan-600">
            Nomes Populares
            <button
              className="flex w-min items-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-500 px-2 py-1 text-sm font-bold text-white"
              {...form.insert.getButtonProps({
                name: organismo.nomePopular.name,
              })}
            >
              <TbPlus /> adicionar
            </button>
          </legend>
          <ul className="flex w-full flex-col gap-3">
            {nomesPopulares.map((nomePopular, index) => (
              <li key={nomePopular.key} className="flex flex-col">
                <div className="flex-grow">
                  <TextInput name={nomePopular.name} />
                </div>
                <FormErrorMessage errors={nomePopular.errors} />
                <button
                  className="mt-2 flex w-min items-center gap-2 rounded-full bg-gradient-to-r from-red-800 to-red-700 px-2 py-1 text-sm font-bold text-white"
                  {...form.remove.getButtonProps({
                    name: organismo.nomePopular.name,
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
                <TextInput name={funcaoBiologica.name} />
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
          Microbiologia
          <button
            className="my-2 flex w-min items-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-500 px-2 py-1 text-sm font-bold text-white"
            {...form.insert.getButtonProps({
              name: fields.microbiologia.name,
            })}
          >
            <TbPlus /> adicionar
          </button>
        </legend>
        <ul className="mt-2 flex w-full flex-col gap-3">
          {microbiologias.map((microbiologia, index) => {
            return (
              <li key={microbiologia.key} className="flex flex-col">
                <TextInput name={microbiologia.name} />
                <FormErrorMessage errors={microbiologia.errors} />
                <button
                  className="mt-2 flex w-min items-center gap-2 rounded-full bg-gradient-to-r from-red-800 to-red-700 px-2 py-1 text-sm font-bold text-white"
                  {...form.remove.getButtonProps({
                    name: fields.microbiologia.name,
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
          Atividade Antifúngica
          <button
            className="my-2 flex w-min items-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-500 px-2 py-1 text-sm font-bold text-white"
            {...form.insert.getButtonProps({
              name: fields.atividadeAntifungica.name,
            })}
          >
            <TbPlus /> adicionar
          </button>
        </legend>
        <ul className="mt-2 flex w-full flex-col gap-3">
          {atividadesAntifungicas.map((atividadeAntifungica, index) => {
            return (
              <li key={atividadeAntifungica.key} className="flex flex-col">
                <TextInput name={atividadeAntifungica.name} />
                <FormErrorMessage errors={atividadeAntifungica.errors} />
                <button
                  className="mt-2 flex w-min items-center gap-2 rounded-full bg-gradient-to-r from-red-800 to-red-700 px-2 py-1 text-sm font-bold text-white"
                  {...form.remove.getButtonProps({
                    name: fields.atividadeAntifungica.name,
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
          Atividade Celular
          <button
            className="my-2 flex w-min items-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-500 px-2 py-1 text-sm font-bold text-white"
            {...form.insert.getButtonProps({
              name: fields.atividadeCelular.name,
            })}
          >
            <TbPlus /> adicionar
          </button>
        </legend>
        <ul className="mt-2 flex w-full flex-col gap-3">
          {atividadesCelulares.map((atividadeCelular, index) => {
            return (
              <li key={atividadeCelular.key} className="flex flex-col">
                <TextInput name={atividadeCelular.name} />
                <FormErrorMessage errors={atividadeCelular.errors} />
                <button
                  className="mt-2 flex w-min items-center gap-2 rounded-full bg-gradient-to-r from-red-800 to-red-700 px-2 py-1 text-sm font-bold text-white"
                  {...form.remove.getButtonProps({
                    name: fields.atividadeCelular.name,
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
          Propriedades Físico-Químicas
          <button
            className="my-2 flex w-min items-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-500 px-2 py-1 text-sm font-bold text-white"
            {...form.insert.getButtonProps({
              name: fields.propriedadesFisicoQuimicas.name,
            })}
          >
            <TbPlus /> adicionar
          </button>
        </legend>
        <ul className="mt-2 flex w-full flex-col gap-3">
          {propriedadesFisicoQuimicas.map((propriedadeFisicaQuimica, index) => {
            return (
              <li key={propriedadeFisicaQuimica.key} className="flex flex-col">
                <TextInput name={propriedadeFisicaQuimica.name} />
                <FormErrorMessage errors={propriedadeFisicaQuimica.errors} />
                <button
                  className="mt-2 flex w-min items-center gap-2 rounded-full bg-gradient-to-r from-red-800 to-red-700 px-2 py-1 text-sm font-bold text-white"
                  {...form.remove.getButtonProps({
                    name: fields.propriedadesFisicoQuimicas.name,
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
              <TextInput label="DOI" name={pub.doi.name} />
              <FormErrorMessage errors={pub.doi.errors} />
              <TextInput label="Título" name={pub.titulo.name} />
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
                <TextInput name={caso.name} />
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
              name: fields.propriedadesFisicoQuimicas.name,
            })}
          >
            <TbPlus /> adicionar
          </button>
        </legend>
        <ul className="mt-2 flex w-full flex-col gap-3">
          {caracteristicasAdicionais.map((caracteristica, index) => {
            return (
              <li key={caracteristica.key} className="flex flex-col">
                <TextInput name={caracteristica.name} />
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
        <SubmitButton>Inserir</SubmitButton>
      </div>
    </Form>
  );
}
