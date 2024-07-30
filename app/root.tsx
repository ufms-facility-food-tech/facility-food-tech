import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import "./tailwind.css";
import type { ReactNode } from "react";
import { Header } from "~/components/header";
import type { components } from "~/api-schema";

export function clientLoader() {
  const user = window.localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }

  return user;
}

export function Layout({ children }: { children: ReactNode }) {
  const user = useLoaderData<typeof clientLoader>() as
    | components["schemas"]["JwtResponse"]
    | null;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="overflow-y-scroll bg-gradient-to-r from-cyan-900 to-cyan-600">
        <Header user={user} />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function HydrateFallback() {
  return <p>Loading...</p>;
}

// export function ErrorBoundaryFallback() {
//   return <p>Something went wrong.</p>;
// }
