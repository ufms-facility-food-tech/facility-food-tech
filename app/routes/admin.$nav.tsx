import {
  type ClientLoaderFunctionArgs,
  Outlet,
  useLoaderData,
  redirect,
} from "@remix-run/react";

export function clientLoader({ params }: ClientLoaderFunctionArgs) {
  const { nav } = params;

  if (nav !== "inserir" && nav !== "listar" && nav !== "usuarios") {
    return redirect("/admin");
  }

  return nav;
}

export default function AdminPanel() {
  const nav = useLoaderData<typeof clientLoader>();

  return (
    <div className="flex w-full flex-col items-center gap-6 p-4">
      <h1 className="text-3xl">a</h1>
      <div className="flex gap-4">
        <button
          type="button"
          className="rounded-full bg-cyan-600 px-5 py-1 text-lg font-bold text-white"
        >
          Inserir
        </button>
        <button
          type="button"
          className="rounded-full bg-cyan-600 px-5 py-1 text-lg font-bold text-white"
        >
          Listar
        </button>
      </div>
      <Outlet />
    </div>
  );
}
