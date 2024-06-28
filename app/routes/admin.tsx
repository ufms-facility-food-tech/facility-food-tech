import { NavLink, Outlet } from "@remix-run/react";
import type { paths } from "~/api-schema";
import { Container } from "~/components/container";

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
