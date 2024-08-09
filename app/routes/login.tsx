import { type ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { Container } from "~/components/container";
import { SubmitButton, TextInput } from "~/components/form";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const user = {
    username,
    password,
  };
  console.log(user);

  // const res = await fetch("/api/auth/login", {
  //   method: "POST",
  //   body: JSON.stringify(user),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // if (!res.ok) {
  //   const text = await res.text();
  //   return redirect(`/login?errorMessage=${text}`);
  // }

  // const jwtResponse = await res.json();

  // window.localStorage.setItem("user", JSON.stringify(jwtResponse));
  // window.localStorage.setItem("jwt", jwtResponse.token as string);

  return redirect("/admin");
}

// export function clientLoader({ request }: ClientLoaderFunctionArgs) {
//   const user = window.localStorage.getItem("user");
//   if (user) {
//     return redirect("/");
//   }

//   const urlSeachParams = new URL(request.url).searchParams;

//   return urlSeachParams;
// }

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
          <SubmitButton>Entrar</SubmitButton>
        </div>
      </Form>
    </Container>
  );
}
