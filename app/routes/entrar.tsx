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
    <Container title="Login">
      <Form method="post" action="/entrar" className="flex flex-col gap-4">
        <TextInput name="email" label="Email" type="email" />
        <div>
          <TextInput name="senha" label="Senha" type="password" />
          <a className="mx-2 flex justify-end text-cyan-700 underline">
            Esqueceu a senha?
          </a>
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
