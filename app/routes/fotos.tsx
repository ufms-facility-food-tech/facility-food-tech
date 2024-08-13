import { json, useLoaderData } from "@remix-run/react";
import { Container } from "~/components/container";
import { db } from "~/db.server/connection";
import { imageMetadataTable } from "~/db.server/schema";

export async function loader() {
  const images = await db
    .select({
      id: imageMetadataTable.id,
      fileName: imageMetadataTable.fileName,
      alt: imageMetadataTable.alt,
    })
    .from(imageMetadataTable);
  return json(images);
}

export default function Fotos() {
  const images = useLoaderData<typeof loader>();

  return (
    <Container title="Fotos">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map(({ fileName, alt, id }) => (
          <div
            key={id}
            className="relative w-full overflow-hidden rounded-lg pb-[100%] shadow-md"
          >
            <img
              src={`/images/upload/${fileName}`}
              alt={alt || ""}
              className="absolute inset-0 h-full w-full object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </Container>
  );
}
