/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/publicacoes/{id}": {
    get: operations["findById"];
    put: operations["update"];
    delete: operations["delete"];
  };
  "/peptideos/{id}": {
    get: operations["findById_1"];
    put: operations["update_1"];
    delete: operations["delete_1"];
  };
  "/organismos/{id}": {
    get: operations["findById_2"];
    put: operations["update_2"];
    delete: operations["delete_2"];
  };
  "/nomes-populares/{id}": {
    get: operations["findById_3"];
    put: operations["update_3"];
    delete: operations["delete_3"];
  };
  "/funcoes-biologicas/{id}": {
    get: operations["findById_4"];
    put: operations["update_4"];
    delete: operations["delete_4"];
  };
  "/caso-sucesso/{id}": {
    get: operations["findById_5"];
    put: operations["update_5"];
    delete: operations["delete_5"];
  };
  "/caracteristicas-adicionais/{id}": {
    get: operations["findById_6"];
    put: operations["update_6"];
    delete: operations["delete_6"];
  };
  "/atividades-citotoxicas/{id}": {
    get: operations["findById_7"];
    put: operations["update_7"];
    delete: operations["delete_7"];
  };
  "/atividades-antifungicas/{id}": {
    get: operations["findById_8"];
    put: operations["update_8"];
    delete: operations["delete_8"];
  };
  "/atividades-antibacterianas/{id}": {
    get: operations["findById_9"];
    put: operations["update_9"];
    delete: operations["delete_9"];
  };
  "/publicacoes": {
    get: operations["findAll"];
    post: operations["create"];
  };
  "/peptideos": {
    get: operations["findAll_1"];
    post: operations["save"];
  };
  "/organismos": {
    get: operations["findAll_2"];
    post: operations["create_1"];
  };
  "/nomes-populares": {
    get: operations["findAll_3"];
    post: operations["create_2"];
  };
  "/funcoes-biologicas": {
    get: operations["findAll_4"];
    post: operations["create_3"];
  };
  "/caso-sucesso": {
    get: operations["findAll_5"];
    post: operations["create_4"];
  };
  "/caracteristicas-adicionais": {
    get: operations["findAll_6"];
    post: operations["create_5"];
  };
  "/atividades-citotoxicas": {
    get: operations["findAll_7"];
    post: operations["create_6"];
  };
  "/atividades-antifungicas": {
    get: operations["findAll_8"];
    post: operations["create_7"];
  };
  "/atividades-antibacterianas": {
    get: operations["findAll_9"];
    post: operations["create_8"];
  };
  "/peptideos/tipoPeptideo/{tipoPeptideo}": {
    get: operations["findByTipoPeptideo"];
  };
  "/organismos/query": {
    get: operations["query"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    Organismo: {
      /** Format: int64 */
      id?: number;
      especie: string;
      origem: string;
      familia: string;
      nomeCientifico: string;
    };
    Peptideo: {
      /** Format: int64 */
      id?: number;
      peptideo?: string;
      /** Format: int32 */
      quantidadeAminoacidos: number;
      /** @enum {string} */
      tipoPeptideo: "SINTETIZADO" | "NATURAL";
      sequencia: string;
      estruturaTridimensional?: string;
      /** Format: double */
      massaMolecular?: number;
      /** Format: double */
      impedimentoEsterico?: number;
      /** Format: double */
      hidrofobicidade?: number;
      /** Format: double */
      pontoIsoeletrico?: number;
      /** Format: double */
      hidropatia?: number;
      /** Format: double */
      anfipaticidade?: number;
      /** Format: double */
      hidrofilicidade?: number;
      /** Format: int32 */
      cargaLiquidaTotal?: number;
      /** Format: double */
      indiceBoman?: number;
      descricao?: string;
      organismo?: components["schemas"]["Organismo"];
    };
    Publicacao: {
      /** Format: int64 */
      id?: number;
      url: string;
      peptideo?: components["schemas"]["Peptideo"];
    };
    NomePopular: {
      /** Format: int64 */
      id?: number;
      nome: string;
      organismo?: components["schemas"]["Organismo"];
    };
    FuncBiologica: {
      /** Format: int64 */
      id?: number;
      descricao: string;
      peptideo?: components["schemas"]["Peptideo"];
    };
    CasoSucesso: {
      /** Format: int64 */
      id?: number;
      caso: string;
      peptideo?: components["schemas"]["Peptideo"];
    };
    CaracterisAdicionais: {
      /** Format: int64 */
      id?: number;
      descricao: string;
      peptideo?: components["schemas"]["Peptideo"];
    };
    AtivCitotoxica: {
      /** Format: int64 */
      id?: number;
      descricao: string;
      peptideo?: components["schemas"]["Peptideo"];
    };
    AtivAntifungica: {
      /** Format: int64 */
      id?: number;
      descricao: string;
      peptideo?: components["schemas"]["Peptideo"];
    };
    AtivAntibacteriana: {
      /** Format: int64 */
      id?: number;
      descricao: string;
      peptideo?: components["schemas"]["Peptideo"];
    };
    PublicacaoDTO: {
      /** Format: int64 */
      id?: number;
      url?: string;
      peptideo?: components["schemas"]["Peptideo"];
    };
    PeptideoDTO: {
      /** Format: int64 */
      id?: number;
      peptideo?: string;
      /** Format: int32 */
      quantidadeAminoacidos?: number;
      /** @enum {string} */
      tipoPeptideo?: "SINTETIZADO" | "NATURAL";
      sequencia?: string;
      estruturaTridimensional?: string;
      /** Format: double */
      massaMolecular?: number;
      /** Format: double */
      impedimentoEsterico?: number;
      /** Format: double */
      hidrofibocidade?: number;
      /** Format: double */
      pontoIsoeletrico?: number;
      /** Format: double */
      hidropatia?: number;
      /** Format: double */
      anfipaticidade?: number;
      /** Format: double */
      hidrofilicidade?: number;
      /** Format: int32 */
      cargaLiquidaTotal?: number;
      /** Format: double */
      indiceBoman?: number;
      descricao?: string;
      organismo?: components["schemas"]["Organismo"];
    };
    OrganismoDTO: {
      /** Format: int64 */
      id?: number;
      especie?: string;
      origem?: string;
      familia?: string;
      nomeCientifico?: string;
    };
    NomePopularDTO: {
      /** Format: int64 */
      id?: number;
      nome?: string;
      organismo?: components["schemas"]["Organismo"];
    };
    FuncBiologicaDTO: {
      /** Format: int64 */
      id?: number;
      descricao?: string;
      peptideo?: components["schemas"]["Peptideo"];
    };
    CasoSucessoDTO: {
      /** Format: int64 */
      id?: number;
      caso?: string;
      peptideo?: components["schemas"]["Peptideo"];
    };
    CaracterisAdicionaisDTO: {
      /** Format: int64 */
      id?: number;
      descricao?: string;
      peptideo?: components["schemas"]["Peptideo"];
    };
    AtivCitotoxicaDTO: {
      /** Format: int64 */
      id?: number;
      descricao?: string;
      peptideo?: components["schemas"]["Peptideo"];
    };
    AtivAntifungicaDTO: {
      /** Format: int64 */
      id?: number;
      descricao?: string;
      peptideo?: components["schemas"]["Peptideo"];
    };
    AtivAntibacterianaDTO: {
      /** Format: int64 */
      id?: number;
      descricao?: string;
      peptideo?: components["schemas"]["Peptideo"];
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  findById: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  update: {
    parameters: {
      path: {
        id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["Publicacao"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["Publicacao"];
        };
      };
    };
  };
  delete: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  findById_1: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  update_1: {
    parameters: {
      path: {
        id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["Peptideo"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["Peptideo"];
        };
      };
    };
  };
  delete_1: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  findById_2: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  update_2: {
    parameters: {
      path: {
        id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["Organismo"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["Organismo"];
        };
      };
    };
  };
  delete_2: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  findById_3: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  update_3: {
    parameters: {
      path: {
        id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["NomePopular"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["NomePopular"];
        };
      };
    };
  };
  delete_3: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  findById_4: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  update_4: {
    parameters: {
      path: {
        id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["FuncBiologica"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["FuncBiologica"];
        };
      };
    };
  };
  delete_4: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  findById_5: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  update_5: {
    parameters: {
      path: {
        id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CasoSucesso"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["CasoSucesso"];
        };
      };
    };
  };
  delete_5: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  findById_6: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  update_6: {
    parameters: {
      path: {
        id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CaracterisAdicionais"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["CaracterisAdicionais"];
        };
      };
    };
  };
  delete_6: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  findById_7: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  update_7: {
    parameters: {
      path: {
        id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["AtivCitotoxica"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["AtivCitotoxica"];
        };
      };
    };
  };
  delete_7: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  findById_8: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  update_8: {
    parameters: {
      path: {
        id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["AtivAntifungica"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["AtivAntifungica"];
        };
      };
    };
  };
  delete_8: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  findById_9: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  update_9: {
    parameters: {
      path: {
        id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["AtivAntibacteriana"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["AtivAntibacteriana"];
        };
      };
    };
  };
  delete_9: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  findAll: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["PublicacaoDTO"][];
        };
      };
    };
  };
  create: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["Publicacao"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["Publicacao"];
        };
      };
    };
  };
  findAll_1: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["PeptideoDTO"][];
        };
      };
    };
  };
  save: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["Peptideo"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["Peptideo"];
        };
      };
    };
  };
  findAll_2: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["OrganismoDTO"][];
        };
      };
    };
  };
  create_1: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["Organismo"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["Organismo"];
        };
      };
    };
  };
  findAll_3: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["NomePopularDTO"][];
        };
      };
    };
  };
  create_2: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["NomePopular"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["NomePopular"];
        };
      };
    };
  };
  findAll_4: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["FuncBiologicaDTO"][];
        };
      };
    };
  };
  create_3: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["FuncBiologica"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["FuncBiologica"];
        };
      };
    };
  };
  findAll_5: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["CasoSucessoDTO"][];
        };
      };
    };
  };
  create_4: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CasoSucesso"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["CasoSucesso"];
        };
      };
    };
  };
  findAll_6: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["CaracterisAdicionaisDTO"][];
        };
      };
    };
  };
  create_5: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CaracterisAdicionais"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["CaracterisAdicionais"];
        };
      };
    };
  };
  findAll_7: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["AtivCitotoxicaDTO"][];
        };
      };
    };
  };
  create_6: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["AtivCitotoxica"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["AtivCitotoxica"];
        };
      };
    };
  };
  findAll_8: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["AtivAntifungicaDTO"][];
        };
      };
    };
  };
  create_7: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["AtivAntifungica"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["AtivAntifungica"];
        };
      };
    };
  };
  findAll_9: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["AtivAntibacterianaDTO"][];
        };
      };
    };
  };
  create_8: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["AtivAntibacteriana"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["AtivAntibacteriana"];
        };
      };
    };
  };
  findByTipoPeptideo: {
    parameters: {
      path: {
        tipoPeptideo: "SINTETIZADO" | "NATURAL";
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  query: {
    parameters: {
      query?: {
        especie?: string;
        familia?: string;
        origem?: string;
        nomeCientifico?: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["OrganismoDTO"][];
        };
      };
    };
  };
}
