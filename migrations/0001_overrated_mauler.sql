CREATE TABLE IF NOT EXISTS "nome_popular" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" text NOT NULL,
	"organismo_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "organismo" DROP COLUMN IF EXISTS "nomes_populares";