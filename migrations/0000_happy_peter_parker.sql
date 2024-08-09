DO $$ BEGIN
 CREATE TYPE "public"."roles" AS ENUM('ADMIN', 'INSERT', 'UPDATE', 'DELETE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "atividade_antifungica" (
	"id" serial PRIMARY KEY NOT NULL,
	"value" text NOT NULL,
	"peptideo_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "atividade_celular" (
	"id" serial PRIMARY KEY NOT NULL,
	"value" text NOT NULL,
	"peptideo_id" integer NOT NULL
);
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
CREATE TABLE IF NOT EXISTS "image_metadata" (
	"id" serial PRIMARY KEY NOT NULL,
	"file_name" text NOT NULL,
	"alt" text,
	"uploaded_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "image_metadata_file_name_unique" UNIQUE("file_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "microbiologia" (
	"id" serial PRIMARY KEY NOT NULL,
	"value" text NOT NULL,
	"peptideo_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organismo" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome_cientifico" text,
	"familia" text,
	"origem" text,
	"nomes_populares" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "peptideo" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome_identificador" text,
	"sequencia" text,
	"sintetizado" boolean,
	"resultado_interno" boolean,
	"quantidade_aminoacidos" integer,
	"massa_molecular" numeric(10, 4),
	"massa_molar" numeric(10, 4),
	"organismo_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "propriedades_fisico_quimicas" (
	"id" serial PRIMARY KEY NOT NULL,
	"value" text NOT NULL,
	"peptideo_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "publicacao" (
	"id" serial PRIMARY KEY NOT NULL,
	"doi" text,
	"titulo" text,
	"peptideo_id" integer NOT NULL,
	CONSTRAINT "publicacao_doi_unique" UNIQUE("doi")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"display_name" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"authorities" "roles" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_name_unique" UNIQUE("name"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
