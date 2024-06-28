import {
  type ClientActionFunctionArgs,
  Form,
  redirect,
} from "@remix-run/react";
import { Container } from "~/components/container";
import { SubmitButton, TextInput } from "~/components/form";

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const formData = await request.formData();
  const nome = formData.get("nome");
  const email = formData.get("email");
  const senha = formData.get("senha");
  // const confirmarSenha = formData.get("confirmarSenha");

  const newUser = {
    nome,
    email,
    senha,
  };
  console.log(newUser);

  return redirect("/admin");
}

export default function Cadastrar() {
  return (
    <Container title="Cadastrar">
      <Form method="post" className="flex flex-col gap-4">
        <TextInput name="nome" label="Nome" />
        <TextInput name="email" label="Email" type="email" />
        <TextInput name="senha" label="Senha" type="password" />
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
