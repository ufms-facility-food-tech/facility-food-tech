import { Container } from "../components/container";

export default function Faq() {
  const glossary = [
    {
      name: "Peptídeo",
      definition: "Sequência curta de aminoácidos.",
      example: "Beta-caseína.",
    },
    {
      name: "Transcriptômica",
      definition:
        "Estudo abrangente dos transcritos genéticos em uma célula ou organismo.",
      example: "Análise da expressão gênica.",
    },
    {
      name: "Proteoma",
      definition:
        "Conjunto completo de proteínas produzidas por um organismo ou em um ambiente específico.",
      example: "Mapeamento de interações proteína-proteína.",
    },
    {
      name: "Genômica",
      definition: "Estudo de todo o conjunto de genes em um organismo.",
      example: "Anotação genômica.",
    },
    {
      name: "Predição de Peptídeos",
      definition:
        "Uso de algoritmos para prever sequências de peptídeos com base em diversos critérios.",
      example: "Predição de peptídeos com atividade antimicrobiana.",
    },
    {
      name: "Busca por Nomes",
      definition:
        "Exploração de informações com base em nome científico, nome popular, família ou espécie.",
      example: 'Busca por "Vitamina C".',
    },
    {
      name: "Busca por Função Biológica",
      definition:
        "Pesquisa direcionada a proteínas com funções específicas, como antimicrobiana ou antioxidante.",
      example: "Encontrar proteínas antioxidantes.",
    },
    {
      name: "Busca por Características Físicas",
      definition:
        "Investigação de peptídeos com base em propriedades físicas como peso molecular e estrutura tridimensional.",
      example: "Pesquisa por peptídeos com peso molecular específico.",
    },
    {
      name: "Busca por Alimentos",
      definition:
        "Identificação de peptídeos e proteínas associados a alimentos específicos.",
      example: 'Buscar peptídeos em "morangos".',
    },
    {
      name: "Busca por Propriedades Nutricionais",
      definition:
        "Pesquisa com base em propriedades nutricionais, como teor de aminoácidos essenciais.",
      example: "Encontrar proteínas ricas em aminoácidos específicos.",
    },
    {
      name: "Nome Científico",
      definition:
        "Designação única e padronizada para identificar uma espécie.",
      example: "Byrsonima crassifolia para a Naminha.",
    },
    {
      name: "Nome Popular",
      definition:
        "Designação não científica utilizada localmente para identificar uma espécie.",
      example: '"Naminha" para Byrsonima crassifolia.',
    },
    {
      name: "Família",
      definition:
        "Agrupamento taxonômico superior que engloba diversas espécies.",
      example: "Malpighiaceae, família da naminha.",
    },
    {
      name: "Espécie",
      definition:
        "Grupo fundamental de classificação biológica, abaixo da categoria de gênero.",
      example: "Byrsonima crassifolia, a espécie da naminha.",
    },
    {
      name: "Antimicrobiana",
      definition:
        "Propriedade de inibir o crescimento ou eliminar microorganismos.",
      example:
        "Proteínas com atividade antimicrobiana presentes em certos alimentos do cerrado e pantanal.",
    },
    {
      name: "Antioxidante",
      definition:
        "Substância que reduz ou evita danos causados pelos radicais livres.",
      example:
        "Proteínas antioxidantes encontradas em frutas nativas do cerrado.",
    },
    {
      name: "Conservante",
      definition:
        "Substância que prolonga a vida útil dos alimentos inibindo a deterioração.",
      example:
        "Peptídeos com propriedades conservantes em alimentos típicos do pantanal.",
    },
    {
      name: "Outras Funções Biológicas",
      definition:
        "Diversas atividades biológicas desempenhadas por proteínas e peptídeos.",
      example: "Enzimas que contribuem para processos metabólicos específicos.",
    },
    {
      name: "Peso Molecular",
      definition:
        "Soma das massas atômicas de todos os átomos em uma molécula.",
      example: "Peso molecular de uma proteína específica no banco de dados.",
    },
    {
      name: "Estrutura Tridimensional",
      definition:
        "Arranjo espacial dos átomos em uma molécula de proteína ou peptídeo.",
      example:
        "Visualização da estrutura tridimensional de uma proteína no cerrado.",
    },
    {
      name: "Propriedades Físico-Químicas",
      definition:
        "Características relacionadas às propriedades físico-químicas de uma molécula.",
      example:
        "Avaliação da hidrofobicidade e solubilidade de peptídeos presentes em alimentos do pantanal.",
    },
  ];

  return (
    <Container title="Glossário">
      <ul className="flex flex-col gap-6">
        {glossary.map((item, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: don't care about the order in this case
          <GlossaryListItem key={index} item={item} />
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
