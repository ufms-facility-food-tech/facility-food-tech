/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/api/peptideos/{id}": {
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
    "/api/organismos/{id}": {
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
    "/api/register": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["registerUser"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/peptideos": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["findAll"];
        put?: never;
        post: operations["create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/organismos": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["findAll_1"];
        put?: never;
        post: operations["create_1"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Authenticate user
         * @description Authenticate user
         */
        post: operations["authenticateUser"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/query": {
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
    "/api/images": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all images
         * @description Get all images in the upload directory
         */
        get: operations["getImages"];
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
        OrganismoDTO: {
            /** Format: int64 */
            id?: number;
            especie?: string;
            origem?: string;
            familia?: string;
            nomePopular?: string[];
        };
        PeptideoDTO: {
            /** Format: int64 */
            id?: number;
            nomeIdentificador?: string;
            sequencia?: string;
            sintetizado?: boolean;
            resultadoInterno?: boolean;
            /** Format: int32 */
            quantidadeAminoacidos?: number;
            /** Format: double */
            massaMolecular?: number;
            /** Format: double */
            massaMolar?: number;
            funcaoBiologica?: string[];
            microbiologia?: string[];
            atividadeAntifungica?: string[];
            atividadeCelular?: string[];
            propriedadesFisicoQuimicas?: string[];
            casoSucesso?: string[];
            caracteristicasAdicionais?: string[];
            publicacao?: components["schemas"]["Publicacao"][];
            organismo?: components["schemas"]["OrganismoDTO"];
        };
        Publicacao: {
            /** Format: int64 */
            id?: number;
            doi: string;
            titulo?: string;
        };
        Organismo: {
            /** Format: int64 */
            id?: number;
            especie?: string;
            origem?: string;
            familia?: string;
            nomePopular?: string[];
            peptideo?: components["schemas"]["Peptideo"][];
        };
        Peptideo: {
            /** Format: int64 */
            id?: number;
            nomeIdentificador?: string;
            sequencia?: string;
            sintetizado?: boolean;
            resultadoInterno?: boolean;
            /** Format: int32 */
            quantidadeAminoacidos?: number;
            /** Format: double */
            massaMolecular?: number;
            /** Format: double */
            massaMolar?: number;
            funcaoBiologica?: string[];
            microbiologia?: string[];
            atividadeAntifungica?: string[];
            atividadeCelular?: string[];
            propriedadesFisicoQuimicas?: string[];
            casoSucesso?: string[];
            caracteristicasAdicionais?: string[];
            publicacao?: components["schemas"]["Publicacao"][];
        };
        SignupRequest: {
            username?: string;
            displayName?: string;
            email?: string;
            password?: string;
        };
        LoginRequest: {
            username?: string;
            password?: string;
        };
        JwtResponse: {
            token?: string;
            /** Format: int64 */
            id?: number;
            username?: string;
            displayName?: string;
            email?: string;
            roles?: string[];
            type?: string;
        };
        ImageMetadata: {
            fileName?: string;
            alt?: string;
            /** Format: int32 */
            width?: number;
            /** Format: int32 */
            height?: number;
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
                    "*/*": components["schemas"]["Organismo"];
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
                "application/json": components["schemas"]["Organismo"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["Organismo"];
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
    registerUser: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SignupRequest"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": string;
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
    create: {
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
                    "*/*": components["schemas"]["Organismo"][];
                };
            };
        };
    };
    create_1: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Organismo"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["Organismo"];
                };
            };
        };
    };
    authenticateUser: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Login request */
        requestBody: {
            content: {
                "application/json": components["schemas"]["LoginRequest"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["JwtResponse"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                };
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                };
            };
        };
    };
    query: {
        parameters: {
            query?: {
                origem?: string;
                especie?: string;
                familia?: string;
                casoSucesso?: string;
                nomePopular?: string;
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
                    "*/*": components["schemas"]["PeptideoDTO"][];
                };
            };
        };
    };
    getImages: {
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
                    "application/json": components["schemas"]["ImageMetadata"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                };
            };
        };
    };
}
