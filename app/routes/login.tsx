import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { type ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { parseWithValibot } from "conform-to-valibot";
import { eq } from "drizzle-orm";
import { object, pipe, regex, string } from "valibot";
import { auth } from "~/.server/auth";
import { db } from "~/.server/db/connection";
import { userTable } from "~/.server/db/schema";
import { Container } from "~/components/container";
import { FormErrorMessage, SubmitButton, TextInput } from "~/components/form";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithValibot(formData, {
    schema: object({
      email: pipe(
        string("Campo obrigatório"),
        regex(/.+@.+/, "Email inválido"),
      ),
      password: string("Campo obrigatório"),
    }),
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, submission.value.email));

  if (!user) {
    return submission.reply({
      formErrors: ["Email ou senha inválidos"],
    });
  }

  const { verify } = await import("@node-rs/argon2");
  const validPassword = await verify(
    user.passwordHash,
    submission.value.password,
    {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    },
  );
  if (!validPassword) {
    return submission.reply({
      formErrors: ["Email ou senha inválidos"],
    });
  }

  const session = await auth.createSession(user.id, {});
  const sessionCookie = auth.createSessionCookie(session.id);

  return redirect("/admin", {
    headers: {
      "Set-Cookie": sessionCookie.serialize(),
    },
  });
}

export default function Entrar() {
  const lastResult = useActionData<typeof action>();
  const [form, fields] = useForm({
    defaultValue: {
      email: "",
      password: "",
    },
    lastResult,
  });

  return (
    <Container title="Entrar">
      <Form
        method="post"
        {...getFormProps(form)}
        className="flex flex-col gap-4"
      >
        <TextInput
          label="Email"
          autoComplete="email"
          {...getInputProps(fields.email, { type: "email" })}
        />
        <FormErrorMessage errors={fields.email.errors} />
        <div>
          <TextInput
            label="Senha"
            autoComplete="current-password"
            {...getInputProps(fields.password, { type: "password" })}
          />
          <div className="mx-2 mt-1 text-end text-cyan-600 underline">
            Esqueceu a senha?
          </div>
        </div>
        <FormErrorMessage errors={fields.password.errors} />
        <FormErrorMessage errors={form.errors} />
        <div className="m-4 flex justify-center">
          <SubmitButton>Entrar</SubmitButton>
        </div>
      </Form>
    </Container>
  );
}
