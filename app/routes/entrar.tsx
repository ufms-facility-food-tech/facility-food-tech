import {
  type ClientActionFunctionArgs,
  Form,
  NavLink,
  redirect,
} from "@remix-run/react";
import { Container } from "~/components/container";
import { SubmitButton, TextInput } from "~/components/form";

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const senha = formData.get("senha");

  const user = {
    email,
    senha,
  };
  console.log(user);

  return redirect("/admin");
}

export default function Entrar() {
  return (
    <Container title="Entrar">
      <Form method="post" action="/entrar" className="flex flex-col gap-4">
        <TextInput
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
        />
        <div>
          <TextInput
            name="senha"
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
