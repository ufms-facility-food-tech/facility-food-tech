import { redirect, type ClientLoaderFunctionArgs } from "@remix-run/react";

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const jwt = window.localStorage.getItem("jwt");
  if (!jwt) {
    return redirect("/login");
  }

  const url = new URL(request.url);

  const res = await fetch(`${url.origin}/api/peptideos`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  if (!res.ok) {
    return {
      error: "failed to fetch data",
    };
  }

  const data = await res.json();
  return {
    data,
  };
}

export default function ListPanel() {
  return null;
}
