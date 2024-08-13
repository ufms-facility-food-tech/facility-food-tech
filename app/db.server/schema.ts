import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
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
});

export const organismoRelations = relations(organismoTable, ({ many }) => ({
  nomePopular: many(nomePopularTable),
}));

export const nomePopularTable = pgTable("nome_popular", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  organismoId: integer("organismo_id").notNull(),
});

export const nomePopularRelations = relations(nomePopularTable, ({ one }) => ({
  organismo: one(organismoTable, {
    fields: [nomePopularTable.organismoId],
    references: [organismoTable.id],
  }),
}));

export const peptideoTable = pgTable("peptideo", {
  id: serial("id").primaryKey(),
  identificador: text("identificador"),
  sequencia: text("sequencia"),
  sintetico: boolean("sintetico").notNull().default(false),
  descobertaLPPFB: boolean("descoberta_lppfb").notNull().default(false),
  quantidadeAminoacidos: integer("quantidade_aminoacidos"),
  massaMolecular: numeric("massa_molecular", { precision: 10, scale: 4 }),
  massaMolar: numeric("massa_molar", { precision: 10, scale: 4 }),
  ensaioCelular: text("ensaio_celular"),
  microbiologia: text("microbiologia"),
  atividadeAntifungica: text("atividade_antifungica"),
  propriedadesFisicoQuimicas: text("propriedades_fisico_quimicas"),
  organismoId: integer("organismo_id"),
});

export const peptideoRelations = relations(peptideoTable, ({ one, many }) => ({
  organismo: one(organismoTable, {
    fields: [peptideoTable.organismoId],
    references: [organismoTable.id],
  }),
  funcaoBiologica: many(funcaoBiologicaTable),
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

export const rolesEnum = pgEnum("roles", [
  "read",
  "update",
  "insert",
  "delete",
  "admin",
]);

export const userTable = pgTable("user", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  displayName: text("display_name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: rolesEnum("role").notNull().default("read"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type User = typeof userTable.$inferSelect;

export const imageMetadataTable = pgTable("image_metadata", {
  id: serial("id").primaryKey(),
  fileName: text("file_name").notNull().unique(),
  alt: text("alt"),
  uploadedAt: timestamp("uploaded_at").notNull().defaultNow(),
});

export const glossarioTable = pgTable("glossario", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  definition: text("definition").notNull(),
  example: text("example").notNull(),
});
