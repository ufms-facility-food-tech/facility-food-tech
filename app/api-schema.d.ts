/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/peptideos/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["findById"];
    put: operations["update"];
    post?: never;
    delete: operations["delete"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/organismos/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["findById_1"];
    put: operations["update_1"];
    post?: never;
    delete: operations["delete_1"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/peptideos": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["findAll"];
    put?: never;
    post: operations["save"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/organismos": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["findAll_1"];
    put?: never;
    post: operations["create"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/peptideos/tipoPeptideo/{tipoPeptideo}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["findByTipoPeptideo"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/organismos/query": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["query"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    AtivAntibacterianaDTO: {
      /** Format: int64 */
      id?: number;
      descricao?: string;
    };
    AtivAntifungicaDTO: {
      /** Format: int64 */
      id?: number;
      descricao?: string;
    };
    AtivCitotoxicaDTO: {
      /** Format: int64 */
      id?: number;
      descricao?: string;
    };
    CaracterisAdicionaisDTO: {
      /** Format: int64 */
      id?: number;
      descricao?: string;
    };
    CasoSucessoDTO: {
      /** Format: int64 */
      id?: number;
      caso?: string;
    };
    FuncBiologicaDTO: {
      /** Format: int64 */
      id?: number;
      descricao?: string;
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
      hidrofobicidade?: number;
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
      funcBiologicas?: components["schemas"]["FuncBiologicaDTO"][];
      ativAntibacterianas?: components["schemas"]["AtivAntibacterianaDTO"][];
      ativAntifungicas?: components["schemas"]["AtivAntifungicaDTO"][];
      ativCitotoxicas?: components["schemas"]["AtivCitotoxicaDTO"][];
      casosSucesso?: components["schemas"]["CasoSucessoDTO"][];
      caracterisAdicionais?: components["schemas"]["CaracterisAdicionaisDTO"][];
      publicacoes?: components["schemas"]["PublicacaoDTO"][];
    };
    PublicacaoDTO: {
      /** Format: int64 */
      id?: number;
      url?: string;
    };
    NomePopularDTO: {
      /** Format: int64 */
      id?: number;
      nome?: string;
    };
    OrganismoDTO: {
      /** Format: int64 */
      id?: number;
      especie?: string;
      origem?: string;
      familia?: string;
      nomeCientifico?: string;
      nomesPopulares?: components["schemas"]["NomePopularDTO"][];
      peptideos?: components["schemas"]["PeptideoDTO"][];
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  findById: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "*/*": components["schemas"]["PeptideoDTO"];
        };
      };
    };
  };
  update: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["PeptideoDTO"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "*/*": components["schemas"]["PeptideoDTO"];
        };
      };
    };
  };
  delete: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  findById_1: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "*/*": components["schemas"]["OrganismoDTO"];
        };
      };
    };
  };
  update_1: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["OrganismoDTO"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "*/*": components["schemas"]["OrganismoDTO"];
        };
      };
    };
  };
  delete_1: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  findAll: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "*/*": components["schemas"]["PeptideoDTO"][];
        };
      };
    };
  };
  save: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["PeptideoDTO"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "*/*": components["schemas"]["PeptideoDTO"];
        };
      };
    };
  };
  findAll_1: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "*/*": components["schemas"]["OrganismoDTO"][];
        };
      };
    };
  };
  create: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["OrganismoDTO"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "*/*": components["schemas"]["OrganismoDTO"];
        };
      };
    };
  };
  findByTipoPeptideo: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        tipoPeptideo: "SINTETIZADO" | "NATURAL";
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "*/*": components["schemas"]["PeptideoDTO"][];
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
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "*/*": components["schemas"]["OrganismoDTO"][];
        };
      };
    };
  };
}
