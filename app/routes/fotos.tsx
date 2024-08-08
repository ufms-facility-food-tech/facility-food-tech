import { json, useLoaderData } from "@remix-run/react";
import type { components } from "~/api-schema";
import { Container } from "~/components/container";

// TODO: hit db directly
// export async function loader() {

//   return json([]);
// }

export async function clientLoader() {
  const res = await fetch("/api/images");

  if (!res.ok) {
    console.error(res);
    return [];
  }

  return json(await res.json());
}

export default function Fotos() {
  const images = useLoaderData<typeof clientLoader>() as Array<
    components["schemas"]["ImageMetadata"]
  >;

  return (
    <Container title="Fotos">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map(({ fileName, alt }) => (
          <div
            key={fileName}
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
