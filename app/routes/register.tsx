import {
  type ClientActionFunctionArgs,
  Form,
  redirect,
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

  const res = await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(res);
  res.json().then(console.log);

  return redirect("/admin");
}

export default function Cadastrar() {
  return (
    <Container title="Cadastrar">
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
