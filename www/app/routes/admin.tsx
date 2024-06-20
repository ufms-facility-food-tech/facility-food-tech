import { NavLink, Outlet } from "@remix-run/react";
import { Container } from "~/components/container";
import type { paths } from "~/api-schema";

export default function Admin() {
  const navLinks = [
    {
      label: "Organismos",
      route: "organismos",
    },
    {
      label: "Peptideos",
      route: "peptideos",
    },
    {
      label: "Publicações",
      route: "publicacoes",
    },
    {
      label: "Nomes Populares",
      route: "nomes-populares",
    },
    {
      label: "Funções Biológicas",
      route: "funcoes-biologicas",
    },
    {
      label: "Casos de Sucesso",
      route: "caso-sucesso",
    },
    {
      label: "Características Adicionais",
      route: "caracteristicas-adicionais",
    },
    {
      label: "Atividades Antibacterianas",
      route: "atividades-antibacterianas",
    },
    {
      label: "Atividades Antifungicas",
      route: "atividades-antifungicas",
    },
    {
      label: "Atividades Citotoxicas",
      route: "atividades-citotoxicas",
    },
  ] satisfies Array<{
    label: string;
    route: `${string & keyof paths extends `/${infer U}` ? U : never}`;
  }>;

  return (
    <Container title="Área Administrativa">
      <div className="flex h-full">
        <aside className="py-6 pr-6">
          <nav>
            <ul className="flex flex-col gap-4">
              {navLinks.map(({ label, route }) => (
                <li key={route}>
                  <AdminNavItem label={label} route={route} />
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <Outlet context={{ navLinks }} />
      </div>
    </Container>
  );
}

function AdminNavItem({ label, route }: { label: string; route: string }) {
  return (
    <NavLink
      prefetch="intent"
      className={({ isActive }) =>
        `${
          isActive ? "underline" : ""
        } text-cyan-700 underline-offset-4 hover:underline`
      }
      to={route}
    >
      {label}
    </NavLink>
  );
}
