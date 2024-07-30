import {
  type ClientActionFunctionArgs,
  type ClientLoaderFunctionArgs,
  Form,
  Link,
  redirect,
  useLoaderData,
} from "@remix-run/react";
import type { components } from "~/api-schema";
import { Container } from "~/components/container";
import { SubmitButton, TextInput } from "~/components/form";

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const displayName = formData.get("displayName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const newUser = {
    username,
    displayName,
    email,
    password,
  } satisfies components["schemas"]["SignupRequest"];

  const res = await fetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const params = {
    success: res.ok ? "true" : "false",
    message: await res.text(),
  };

  return redirect(`/register?${new URLSearchParams(params).toString()}`);
}

export function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const user = window.localStorage.getItem("user");
  if (user) {
    return redirect("/");
  }

  const urlSeachParams = new URL(request.url).searchParams;
  return urlSeachParams;
}

export default function Cadastrar() {
  const urlSeachParams = useLoaderData<typeof clientLoader>();
  const registerSuccess = urlSeachParams.get("success");

  if (registerSuccess != null && registerSuccess === "true") {
    return (
      <Container title="Cadastrar">
        <div className="my-16 flex flex-col items-center">
          <p>Cadastro realizado com sucesso.</p>
          <Link to="/" className="text-cyan-600 underline">
            Voltar para a página inicial
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container title="Cadastrar">
      {registerSuccess != null && registerSuccess === "false" && (
        <div className="my-16 flex flex-col items-center">
          <p>
            Erro ao cadastrar usuário
            {urlSeachParams.has("message")
              ? `: ${urlSeachParams.get("message")}`
              : ""}
          </p>
        </div>
      )}
      <Form method="post" className="flex flex-col gap-4">
        <TextInput
          name="displayName"
          label="Nome de exibição"
          autoComplete="name"
        />
        <TextInput
          name="username"
          label="Nome de usuário"
          autoComplete="username"
        />
        <TextInput
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
        />
        <TextInput
          name="password"
          label="Senha"
          type="password"
          autoComplete="new-password"
        />
        <TextInput
          name="confirmarSenha"
          label="Confirmar Senha"
          type="password"
        />
        <div className="m-4 flex justify-center">
          <SubmitButton>Cadastrar</SubmitButton>
        </div>
      </Form>
    </Container>
  );
}
