import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Facility FoodTech do Cerrado-Pantanal" },
    {
      name: "description",
      content:
        "Bem-vindo ao nosso site dedicado à pesquisa biológica com enfoque exclusivo nas riquezas naturais do cerrado e pantanal!",
    },
  ];
};

export default function Index() {
  return (
    <>
      <div className="h-80">
        <div className="flex items-center justify-around">
          <div className="my-9 flex flex-col">
            <h1 className="text-balance text-center text-4xl font-bold text-white md:w-96">
              Facility FoodTech do Cerrado-Pantanal
            </h1>
          </div>
          {/* biome-ignore lint/style/useSelfClosingElements: temporary */}
          <div className="flex flex-col"></div>
        </div>
      </div>
      {/* biome-ignore lint/style/useSelfClosingElements: temporary */}
      <div className="h-40 bg-gradient-to-b from-orange-50 via-white to-orange-100"></div>
      <div className="flex flex-col gap-4 bg-white p-12 font-sans">
        <h2 className="text-xl font-bold">Introdução</h2>
        <p>
          Bem-vindo ao nosso site dedicado à pesquisa biológica com enfoque
          exclusivo nas riquezas naturais do cerrado e pantanal. Nossa
          plataforma é uma extensão do Laboratório de Purificação de Proteínas e
          Suas Funções Biológicas da UFMS, coordenado pela Profª Drª Maria Lígia
          Rodrigues Macedo.
        </p>
        <h2 className="text-xl font-bold">Propósito</h2>
        <p>
          Nosso objetivo é proporcionar um ambiente virtual abrangente para que
          comunidade científica, estudantes e entusiastas da biologia possam
          explorar as maravilhas do cerrado e pantanal. Aqui, você encontrará
          recursos avançados para pesquisa em predição de peptídeos, análise
          transcriptômica, estudo do proteoma e decifração genômica, todos
          alinhados ao ecossistema único dessas regiões brasileiras.
        </p>
        <h2 className="text-xl font-bold">Explorando o Site</h2>
        <ul>
          <li>
            <b>Busca Especializada</b>: Utilize nossa barra de busca para
            encontrar informações detalhadas sobre peptídeos, transcriptômica,
            proteoma e genômica associados ao cerrado e pantanal.
          </li>
          <li>
            <b>Categorias Específicas</b>: Navegue por seções dedicadas a esses
            biomas, oferecendo uma visão aprofundada e segmentada de nossas
            pesquisas.
          </li>
          <li>
            <b>Recursos Complementares</b>: Acesse o glossário de termos, links
            para artigos científicos, referências e a seção de download para
            aprofundar seus estudos.
          </li>
        </ul>
        <p>
          Embarque conosco nessa jornada de descobertas científicas, onde o
          cerrado e pantanal se tornam fontes inesgotáveis de conhecimento, e o
          Laboratório de Purificação de Proteínas da UFMS, sob a liderança da
          Professora Doutora Maria Lígia Rodrigues Macedo, desvenda os segredos
          desses ecossistemas únicos.
        </p>
      </div>
    </>
  );
}
