import { useLoaderData, useNavigate } from "@remix-run/react";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Container } from "~/components/container";
import { db } from "~/db.server/connection";
import { eq } from "drizzle-orm";
import { peptideoTable } from "~/db.server/schema";
import { TbFlaskFilled } from "react-icons/tb";

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  const peptideo = await db.query.peptideoTable.findFirst({
    where: eq(peptideoTable.id, Number(id)),
    with: {
      organismo: {
        with: {
          nomePopular: true,
        },
      },
      funcaoBiologica: true,
      casoSucesso: true,
      caracteristicasAdicionais: true,
      publicacao: true,
    },
  });

  return json(peptideo);
}

export default function Peptideo() {
  const {
    casoSucesso,
    ensaioCelular,
    microbiologia,
    atividadeAntifungica,
    propriedadesFisicoQuimicas,
    caracteristicasAdicionais,
    organismo,
    publicacao,
    funcaoBiologica,
    ...peptideo
  } = useLoaderData<typeof loader>();

  const navigate = useNavigate();
  return (
    <Container>
      <div className="my-5 flex flex-col gap-4">
        {peptideo.descobertaLPPFB ? (
          <div className="flex items-center gap-2 rounded-2xl bg-gradient-to-br from-cyan-600 to-cyan-500 py-2 pl-5 pr-4 text-lg font-bold text-white">
            <TbFlaskFilled /> Descoberta do LPPFB
          </div>
        ) : null}

        <div className="flex flex-col gap-2">
          <h2 className="border-b-2 border-neutral-100 pb-2 text-4xl font-bold text-cyan-600">
            Peptídeo
          </h2>
          <div className="rounded-lg bg-neutral-50 p-4">
            {peptideo.sintetico ? (
              <p className="text-lg font-bold text-cyan-600">Sintético</p>
            ) : (
              <>
                <p className="text-lg">
                  <strong className="text-cyan-600">Nome científico:</strong>{" "}
                  {organismo?.nomeCientifico ?? "(sem dados)"}
                </p>
                <p className="text-lg">
                  <strong className="text-cyan-600">Família:</strong>{" "}
                  {organismo?.familia ?? "(sem dados)"}
                </p>

                <p className="text-lg">
                  <strong className="text-cyan-600">Origem:</strong>{" "}
                  {organismo?.origem ?? "(sem dados)"}
                </p>

                <p className="text-lg">
                  <strong className="text-cyan-600">Nomes populares:</strong>{" "}
                  {organismo?.nomePopular
                    ? organismo?.nomePopular?.map(({ nome }) => nome).join(", ")
                    : "(sem dados)"}
                </p>
              </>
            )}
            <p className="text-lg">
              <strong className="text-cyan-600">Identificador:</strong>{" "}
              {peptideo.identificador ?? "(sem dados)"}
            </p>
            <p className="text-lg">
              <strong className="text-cyan-600">Massa molecular:</strong>{" "}
              {peptideo.massaMolecular
                ? `${peptideo.massaMolecular} Da`
                : "(sem dados)"}
            </p>
            <p className="text-lg">
              <strong className="text-cyan-600">Massa molar:</strong>{" "}
              {peptideo.massaMolar
                ? `${peptideo.massaMolar} g/mol`
                : "(sem dados)"}
            </p>
            <p className="text-lg">
              <strong className="text-cyan-600">Qtd. aminoácidos:</strong>{" "}
              {peptideo.quantidadeAminoacidos ?? "(sem dados)"}
            </p>
          </div>
        </div>

        <div>
          <h3 className="border-b-2 border-neutral-100 pb-2 text-2xl font-bold text-cyan-600">
            Sequência
          </h3>
          <p className="mt-2 rounded-lg bg-neutral-50 px-4 py-2 text-lg">
            {peptideo.sequencia ?? "(sem dados)"}
          </p>
        </div>

        <div>
          <h3 className="border-b-2 border-neutral-100 pb-2 text-2xl font-bold text-cyan-600">
            Casos de sucesso
          </h3>

          {casoSucesso.length > 0 ? (
            casoSucesso.map(({ id, value }) => (
              <p
                key={id}
                className="mt-2 rounded-lg bg-neutral-50 px-4 py-2 text-lg"
              >
                {value}
              </p>
            ))
          ) : (
            <p className="mt-2 rounded-lg bg-neutral-50 px-4 py-2 text-lg">
              (sem dados)
            </p>
          )}
        </div>

        <div>
          <h3 className="border-b-2 border-neutral-100 pb-2 text-2xl font-bold text-cyan-600">
            Ensaio celular
          </h3>
          <p className="mt-2 rounded-lg bg-neutral-50 px-4 py-2 text-lg">
            {ensaioCelular ?? "(sem dados)"}
          </p>
        </div>

        <div>
          <h3 className="border-b-2 border-neutral-100 pb-2 text-2xl font-bold text-cyan-600">
            Microbiologia
          </h3>
          <p className="mt-2 rounded-lg bg-neutral-50 px-4 py-2 text-lg">
            {microbiologia ?? "(sem dados)"}
          </p>
        </div>

        <div>
          <h3 className="border-b-2 border-neutral-100 pb-2 text-2xl font-bold text-cyan-600">
            Atividade antifúngica
          </h3>
          <p className="mt-2 rounded-lg bg-neutral-50 px-4 py-2 text-lg">
            {atividadeAntifungica ?? "(sem dados)"}
          </p>
        </div>

        <div>
          <h3 className="border-b-2 border-neutral-100 pb-2 text-2xl font-bold text-cyan-600">
            Propriedades Físico-Químicas
          </h3>
          <p className="mt-2 rounded-lg bg-neutral-50 px-4 py-2 text-lg">
            {propriedadesFisicoQuimicas ?? "(sem dados)"}
          </p>
        </div>

        <div>
          <h3 className="border-b-2 border-neutral-100 pb-2 text-2xl font-bold text-cyan-600">
            Publicações
          </h3>
          {publicacao.length > 0 ? (
            publicacao.map(({ id, doi, titulo }) => (
              <div
                key={id}
                className="mt-2 flex flex-col gap-2 rounded-lg bg-neutral-50 px-4 py-2 text-lg"
              >
                <p>
                  <strong>DOI:</strong> {doi}
                </p>
                <p>
                  <strong>Título:</strong> {titulo}
                </p>
              </div>
            ))
          ) : (
            <p className="mt-2 rounded-lg bg-neutral-50 px-4 py-2 text-lg">
              (sem dados)
            </p>
          )}
        </div>

        <div>
          <h3 className="border-b-2 border-neutral-100 pb-2 text-2xl font-bold text-cyan-600">
            Funções biológicas
          </h3>

          {funcaoBiologica.length > 0 ? (
            funcaoBiologica.map(({ id, value }) => (
              <p
                key={id}
                className="mt-2 rounded-lg bg-neutral-50 px-4 py-2 text-lg"
              >
                {value}
              </p>
            ))
          ) : (
            <p className="mt-2 rounded-lg bg-neutral-50 px-4 py-2 text-lg">
              (sem dados)
            </p>
          )}
        </div>

        <div>
          <h3 className="border-b-2 border-neutral-100 pb-2 text-2xl font-bold text-cyan-600">
            Características adicionais
          </h3>
          {caracteristicasAdicionais.length > 0 ? (
            caracteristicasAdicionais.map(({ id, value }) => (
              <p
                key={id}
                className="mt-2 rounded-lg bg-neutral-50 px-4 py-2 text-lg"
              >
                {value}
              </p>
            ))
          ) : (
            <p className="mt-2 rounded-lg bg-neutral-50 px-4 py-2 text-lg">
              (sem dados)
            </p>
          )}
        </div>

        <button
          type="button"
          className="w-min self-center rounded-full bg-neutral-100 px-6 py-2 text-lg font-bold"
          onClick={() => navigate(-1)}
        >
          Voltar
        </button>
      </div>
    </Container>
  );
}
