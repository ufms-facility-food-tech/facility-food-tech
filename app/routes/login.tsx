import {
  type ClientActionFunctionArgs,
  type ClientLoaderFunctionArgs,
  Form,
  redirect,
  useLoaderData,
} from "@remix-run/react";
import type { components } from "~/api-schema";
import { Container } from "~/components/container";
import { SubmitButton, TextInput } from "~/components/form";

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const user = {
    username,
    password,
  } satisfies components["schemas"]["LoginRequest"];

  const res = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    return redirect(`/login?errorMessage=${text}`);
  }

  const jwtResponse =
    (await res.json()) as components["schemas"]["JwtResponse"];

  window.localStorage.setItem("user", JSON.stringify(jwtResponse));
  window.localStorage.setItem("jwt", jwtResponse.token as string);

  return redirect("/");
}

export function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const user = window.localStorage.getItem("user");
  if (user) {
    return redirect("/");
  }

  const urlSeachParams = new URL(request.url).searchParams;

  return urlSeachParams;
}

export default function Entrar() {
  const urlSeachParams = useLoaderData<typeof clientLoader>();

  return (
    <Container title="Entrar">
      {urlSeachParams.has("errorMessage") && (
        <div className="my-16 flex flex-col items-center">
          <p>
            Erro ao realizar login
            {`: ${urlSeachParams.get("message")}`}
          </p>
        </div>
      )}
      <Form method="post" className="flex flex-col gap-4">
        <TextInput
          name="username"
          label="Email ou nome de usuário"
          type="text"
          autoComplete="email"
        />
        <div>
          <TextInput
            name="password"
            label="Senha"
            type="password"
            autoComplete="current-password"
          />
          <div className="mx-2 mt-1 text-end text-cyan-600 underline">
            Esqueceu a senha?
          </div>
        </div>
        <div className="m-4 flex justify-center">
          <SubmitButton>Entrar</SubmitButton>
        </div>
      </Form>
    </Container>
  );
}
