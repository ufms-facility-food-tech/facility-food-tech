import { useLoaderData, useNavigate } from "@remix-run/react";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Container } from "~/components/container";
import { db } from "~/db.server/connection";
import { eq } from "drizzle-orm";
import { peptideoTable } from "~/db.server/schema";

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
  const peptideo = useLoaderData<typeof loader>();

  const navigate = useNavigate();
  return (
    <Container>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-4 text-cyan-600 underline"
      >
        &lt; Voltar
      </button>
      <h2 className="mb-4 flex gap-4 border-b-2 border-neutral-100 text-4xl font-bold text-cyan-600">
        Informações gerais
      </h2>

      <div className="relative my-2 w-full overflow-x-auto rounded-lg border border-neutral-100">
      </div>
    </Container>
  );
}
