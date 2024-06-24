import {
  Outlet,
  useLoaderData,
  useOutletContext,
  type ClientLoaderFunctionArgs,
} from "@remix-run/react";

export function clientLoader({ params }: ClientLoaderFunctionArgs) {
  return { params };
}

export default function AdminPanel() {
  const { params } = useLoaderData<typeof clientLoader>();

  const { navLinks } = useOutletContext<{
    navLinks: Array<{ name: string; path: string }>;
  }>();

  const title = navLinks.find(({ path }) => path === params.panel)?.name;

  return (
    <div className="flex w-full flex-col items-center gap-6 p-4">
      <h1 className="text-3xl">{title}</h1>
      <div className="flex gap-4">
        <button className="rounded-full bg-cyan-700 px-5 py-1 text-lg font-bold text-white">
          Inserir
        </button>
        <button className="rounded-full bg-cyan-700 px-5 py-1 text-lg font-bold text-white">
          Listar
        </button>
      </div>
      <Outlet />
    </div>
  );
}
