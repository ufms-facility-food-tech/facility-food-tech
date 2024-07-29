import {
  type ClientLoaderFunctionArgs,
  json,
  useLoaderData,
} from "@remix-run/react";
import type { components } from "~/api-schema";
import { Container } from "~/components/container";

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const url = new URL(request.url);

  const res = await fetch(`${url.origin}/api/images`);

  if (!res.ok) {
    console.error(res);
    return [];
  }

  return json(await res.json());
}

export default function Fotos() {
  const photos = useLoaderData<typeof clientLoader>() as Array<
    components["schemas"]["ImageMetadata"]
  >;

  return (
    <Container title="Fotos">
      {/* TODO: fix max-height */}
      <ul className="flex flex-wrap justify-center gap-2 md:max-h-[8500px] md:flex-col md:justify-start xl:max-h-[4800px] 2xl:max-h-[3500px]">
        {photos.map(({ fileName, alt }) => (
          <li
            key={fileName}
            className="bg-neutral-100 md:w-1/2 xl:w-1/3 2xl:w-1/4"
          >
            <label>
              <img
                className="h-full w-auto"
                src={`/images/upload/${fileName}`}
                alt={alt || ""}
                loading="lazy"
              />
              {alt ? <span className="m-1">{alt}</span> : null}
            </label>
          </li>
        ))}
      </ul>
    </Container>
  );
}
