DO $$ BEGIN
 CREATE TYPE "public"."roles" AS ENUM('read', 'update', 'insert', 'delete', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "caracteristicas_adicionais" (
	"id" serial PRIMARY KEY NOT NULL,
	"value" text NOT NULL,
	"peptideo_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "caso_sucesso" (
	"id" serial PRIMARY KEY NOT NULL,
	"value" text NOT NULL,
	"peptideo_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "funcao_biologica" (
	"id" serial PRIMARY KEY NOT NULL,
	"value" text NOT NULL,
	"peptideo_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "glossario" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"definition" text NOT NULL,
	"example" text NOT NULL,
	CONSTRAINT "glossario_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "image_metadata" (
	"id" serial PRIMARY KEY NOT NULL,
	"file_name" text NOT NULL,
	"alt" text,
	"uploaded_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "image_metadata_file_name_unique" UNIQUE("file_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nome_popular" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" text NOT NULL,
	CONSTRAINT "nome_popular_nome_unique" UNIQUE("nome")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organismo" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome_cientifico" text,
	"familia" text,
	"origem" text,
	CONSTRAINT "organismo_nome_cientifico_unique" UNIQUE("nome_cientifico")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organismo_to_nome_popular" (
	"organismo_id" integer NOT NULL,
	"nome_popular_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "peptideo" (
	"id" serial PRIMARY KEY NOT NULL,
	"identificador" text,
	"sequencia" text NOT NULL,
	"sintetico" boolean DEFAULT false NOT NULL,
	"descoberta_lppfb" boolean DEFAULT false NOT NULL,
	"banco_dados" text,
	"palavras_chave" text,
	"quantidade_aminoacidos" integer,
	"massa_molecular" numeric,
	"massa_molar" numeric,
	"ensaio_celular" text,
	"microbiologia" text,
	"atividade_antifungica" text,
	"propriedades_fisico_quimicas" text,
	"organismo_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "peptideo_to_publicacao" (
	"peptideo_id" integer NOT NULL,
	"publicacao_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "publicacao" (
	"id" serial PRIMARY KEY NOT NULL,
	"doi" text,
	"titulo" text,
	CONSTRAINT "publicacao_doi_unique" UNIQUE("doi")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"display_name" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"role" "roles" DEFAULT 'read' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_name_unique" UNIQUE("name"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organismo_to_nome_popular" ADD CONSTRAINT "organismo_to_nome_popular_organismo_id_organismo_id_fk" FOREIGN KEY ("organismo_id") REFERENCES "public"."organismo"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organismo_to_nome_popular" ADD CONSTRAINT "organismo_to_nome_popular_nome_popular_id_nome_popular_id_fk" FOREIGN KEY ("nome_popular_id") REFERENCES "public"."nome_popular"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "peptideo_to_publicacao" ADD CONSTRAINT "peptideo_to_publicacao_peptideo_id_peptideo_id_fk" FOREIGN KEY ("peptideo_id") REFERENCES "public"."peptideo"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "peptideo_to_publicacao" ADD CONSTRAINT "peptideo_to_publicacao_publicacao_id_publicacao_id_fk" FOREIGN KEY ("publicacao_id") REFERENCES "public"."publicacao"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "nome_idx" ON "nome_popular" USING btree ("nome");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "nome_cientifico_idx" ON "organismo" USING btree ("nome_cientifico");