import {
  Links,
  Meta,
  type MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import "./tailwind.css";
import type { ReactNode } from "react";
import type { components } from "~/api-schema";
import { Header } from "~/components/header";
import { Container } from "~/components/container";

export const meta: MetaFunction = () => {
  return [
    { title: "Facility FoodTech do Cerrado-Pantanal" },
    {
      charset: "utf-8",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      name: "description",
      content:
        "Bem-vindo ao nosso site dedicado à pesquisa biológica com enfoque exclusivo nas riquezas naturais do cerrado e pantanal!",
    },
  ];
};

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="overflow-y-scroll bg-gradient-to-r from-cyan-900 to-cyan-600">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function clientLoader() {
  const user = window.localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }

  return user;
}

export default function App() {
  const user = useLoaderData<typeof clientLoader>() as
    | components["schemas"]["JwtResponse"]
    | null;

  return (
    <>
      <Header user={user} />
      <Outlet />
    </>
  );
}

export function HydrateFallback() {
  return null;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Container
        title={`Erro ${error.status} - "${error.statusText.toUpperCase()}"`}
      >
        <p className="rounded-xl bg-red-50 p-2 text-base text-red-800">
          {error.data}
        </p>
      </Container>
    );
  }

  return (
    <Container title="Erro">
      <p className="rounded-xl bg-red-50 p-2 text-base text-red-800">
        {/* @ts-expect-error */}
        {error?.message ?? "Erro desconhecido."}
      </p>
    </Container>
  );
}
