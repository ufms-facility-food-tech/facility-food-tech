import type { MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";

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
  const searchIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0,0,300,250"
      className="m-auto block size-12"
    >
      <title>Pesquisar</title>
      <g
        fill="#ffffff"
        fill-rule="nonzero"
        stroke="none"
        stroke-width="1"
        stroke-linecap="butt"
        stroke-linejoin="miter"
        stroke-miterlimit="10"
        stroke-dasharray=""
        stroke-dashoffset="0"
        font-family="none"
        font-weight="none"
        font-size="none"
        text-anchor="none"
      >
        <g transform="scale(5.12,5.12)">
          <path d="M21,3c-9.37891,0 -17,7.62109 -17,17c0,9.37891 7.62109,17 17,17c3.71094,0 7.14063,-1.19531 9.9375,-3.21875l13.15625,13.125l2.8125,-2.8125l-13,-13.03125c2.55469,-2.97656 4.09375,-6.83984 4.09375,-11.0625c0,-9.37891 -7.62109,-17 -17,-17zM21,5c8.29688,0 15,6.70313 15,15c0,8.29688 -6.70312,15 -15,15c-8.29687,0 -15,-6.70312 -15,-15c0,-8.29687 6.70313,-15 15,-15z" />
        </g>
      </g>
    </svg>
  );

  return (
    <>
      <div className="mt-6 min-h-96 overflow-x-hidden lg:mt-0">
        <div className="flex flex-col items-center justify-around lg:flex-row">
          <div className="lg:min-w-2/5 flex w-full flex-col items-center gap-8">
            <h1 className="text-balance px-6 text-center text-4xl font-bold text-white lg:w-96 lg:px-0">
              Facility FoodTech do Cerrado-Pantanal
            </h1>
            <Form
              method="get"
              action="/pesquisa/resultado"
              className="flex h-16 w-11/12"
            >
              <input
                type="text"
                name="especie"
                className="w-full rounded-l-xl border-2 border-white bg-white px-4 py-2 text-black"
                placeholder="Pesquisar"
              />
              <button
                aria-label="Pesquisar"
                type="submit"
                className="rounded-r-xl bg-cyan-500 px-4 py-2 text-white"
              >
                {searchIcon}
              </button>
            </Form>
          </div>
          <div className="mx-4 mb-20 mt-12 flex items-center gap-16">
            <img
              src="/images/img-01.jpg"
              alt="UFMS - LABORATÓRIO DE PURIFICAÇÃO DE PROTEÍNAS E SUAS FUNÇÕES BIOLÓGICAS"
              className="h-56 max-w-md translate-x-4 translate-y-10 rotate-12 text-balance border-4 border-neutral-300"
            />
            <img
              src="/images/img-02.jpg"
              alt="UFMS - LABORATÓRIO DE PURIFICAÇÃO DE PROTEÍNAS E SUAS FUNÇÕES BIOLÓGICAS"
              className="h-56 max-w-md -rotate-6 text-balance border-4 border-neutral-300"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 bg-white px-4 py-3 font-sans sm:p-10">
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
