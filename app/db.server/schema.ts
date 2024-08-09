import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const organismoTable = pgTable("organismo", {
  id: serial("id").primaryKey(),
  nomeCientifico: text("nome_cientifico"),
  familia: text("familia"),
  origem: text("origem"),
  nomesPopulares: jsonb("nomes_populares").$type<Array<string>>(),
});

export const peptideoTable = pgTable("peptideo", {
  id: serial("id").primaryKey(),
  nomeIdentificador: text("nome_identificador"),
  sequencia: text("sequencia"),
  sintetizado: boolean("sintetizado"),
  resultadoInterno: boolean("resultado_interno"),
  quantidadeAminoacidos: integer("quantidade_aminoacidos"),
  massaMolecular: numeric("massa_molecular", { precision: 10, scale: 4 }),
  massaMolar: numeric("massa_molar", { precision: 10, scale: 4 }),
  organismoId: integer("organismo_id"),
});

export const peptideoRelations = relations(peptideoTable, ({ one, many }) => ({
  organismo: one(organismoTable, {
    fields: [peptideoTable.organismoId],
    references: [organismoTable.id],
  }),
  funcaoBiologica: many(funcaoBiologicaTable),
  microbiologia: many(microbiologiaTable),
  atividadeAntifungica: many(atividadeAntifungicaTable),
  atividadeCelular: many(atividadeCelularTable),
  propriedadesFisicoQuimicas: many(propriedadesFisicoQuimicasTable),
  casoSucesso: many(casoSucessoTable),
  caracteristicasAdicionais: many(caracteristicasAdicionaisTable),
  publicacao: many(publicacaoTable),
}));

export const funcaoBiologicaTable = pgTable("funcao_biologica", {
  id: serial("id").primaryKey(),
  value: text("value").notNull(),
  peptideoId: integer("peptideo_id").notNull(),
});

export const funcaoBiologicaRelations = relations(
  funcaoBiologicaTable,
  ({ one }) => ({
    peptideo: one(peptideoTable, {
      fields: [funcaoBiologicaTable.peptideoId],
      references: [peptideoTable.id],
    }),
  }),
);

export const microbiologiaTable = pgTable("microbiologia", {
  id: serial("id").primaryKey(),
  value: text("value").notNull(),
  peptideoId: integer("peptideo_id").notNull(),
});

export const microbiologiaRelations = relations(
  microbiologiaTable,
  ({ one }) => ({
    peptideo: one(peptideoTable, {
      fields: [microbiologiaTable.peptideoId],
      references: [peptideoTable.id],
    }),
  }),
);

export const atividadeAntifungicaTable = pgTable("atividade_antifungica", {
  id: serial("id").primaryKey(),
  value: text("value").notNull(),
  peptideoId: integer("peptideo_id").notNull(),
});

export const atividadeAntifungicaRelations = relations(
  atividadeAntifungicaTable,
  ({ one }) => ({
    peptideo: one(peptideoTable, {
      fields: [atividadeAntifungicaTable.peptideoId],
      references: [peptideoTable.id],
    }),
  }),
);

export const atividadeCelularTable = pgTable("atividade_celular", {
  id: serial("id").primaryKey(),
  value: text("value").notNull(),
  peptideoId: integer("peptideo_id").notNull(),
});

export const atividadeCelularRelations = relations(
  atividadeCelularTable,
  ({ one }) => ({
    peptideo: one(peptideoTable, {
      fields: [atividadeCelularTable.peptideoId],
      references: [peptideoTable.id],
    }),
  }),
);

export const propriedadesFisicoQuimicasTable = pgTable(
  "propriedades_fisico_quimicas",
  {
    id: serial("id").primaryKey(),
    value: text("value").notNull(),
    peptideoId: integer("peptideo_id").notNull(),
  },
);

export const propriedadesFisicoQuimicasRelations = relations(
  propriedadesFisicoQuimicasTable,
  ({ one }) => ({
    peptideo: one(peptideoTable, {
      fields: [propriedadesFisicoQuimicasTable.peptideoId],
      references: [peptideoTable.id],
    }),
  }),
);

export const casoSucessoTable = pgTable("caso_sucesso", {
  id: serial("id").primaryKey(),
  value: text("value").notNull(),
  peptideoId: integer("peptideo_id").notNull(),
});

export const casoSucessoRelations = relations(casoSucessoTable, ({ one }) => ({
  peptideo: one(peptideoTable, {
    fields: [casoSucessoTable.peptideoId],
    references: [peptideoTable.id],
  }),
}));

export const caracteristicasAdicionaisTable = pgTable(
  "caracteristicas_adicionais",
  {
    id: serial("id").primaryKey(),
    value: text("value").notNull(),
    peptideoId: integer("peptideo_id").notNull(),
  },
);

export const caracteristicasAdicionaisRelations = relations(
  caracteristicasAdicionaisTable,
  ({ one }) => ({
    peptideo: one(peptideoTable, {
      fields: [caracteristicasAdicionaisTable.id],
      references: [peptideoTable.id],
    }),
  }),
);

export const publicacaoTable = pgTable("publicacao", {
  id: serial("id").primaryKey(),
  doi: text("doi").unique(),
  titulo: text("titulo"),
  peptideoId: integer("peptideo_id").notNull(),
});

export const publicacaoRelations = relations(publicacaoTable, ({ one }) => ({
  peptideo: one(peptideoTable, {
    fields: [publicacaoTable.peptideoId],
    references: [peptideoTable.id],
  }),
}));

export const rolesEnum = pgEnum("roles", ["ADMIN", "INSERT", "UPDATE", "DELETE"]);

export const userTable = pgTable("user", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  displayName: text("display_name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  authorities: rolesEnum("authorities").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type User = typeof userTable.$inferSelect;

export const imageMetadataTable = pgTable("image_metadata", {
  id: serial("id").primaryKey(),
  fileName: text("file_name").notNull().unique(),
  alt: text("alt"),
  uploadedAt: timestamp("uploaded_at").notNull().defaultNow(),
});
