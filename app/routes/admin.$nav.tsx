import { type LoaderFunctionArgs, redirect } from "@remix-run/node";

export function loader({ params }: LoaderFunctionArgs) {
  const { nav } = params;

  if (nav !== "inserir" && nav !== "listar" && nav !== "usuarios") {
    return redirect("/admin");
  }
}
