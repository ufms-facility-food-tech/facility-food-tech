import {
  type ClientActionFunctionArgs,
  Form,
  NavLink,
  redirect,
} from "@remix-run/react";
import { Container } from "~/components/container";
import { SubmitButton, TextInput } from "~/components/form";
import type { components } from "~/api-schema";

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const user = {
    username,
    password,
  } satisfies components["schemas"]["LoginRequest"];

  const res = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(res);
  res.json().then(console.log);

  return redirect("/admin");
}

export default function Entrar() {
  return (
    <Container title="Entrar">
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
          <SubmitButton>
            <NavLink to="/admin">Entrar</NavLink>
          </SubmitButton>
        </div>
      </Form>
    </Container>
  );
}
