import { NavLink, Outlet } from "@remix-run/react";
import { IconContext } from "react-icons";
import { TbDatabasePlus, TbDatabaseSearch, TbUsersGroup } from "react-icons/tb";
import { Container } from "~/components/container";

export default function Admin() {
  return (
    <Container title="Área Administrativa">
      <div className="flex h-full">
        <aside className="m-2 w-1/4 py-6 pr-2">
          <nav>
            <ul className="flex flex-col gap-4">
              <AdminNavItem
                label="Listar registros"
                route="listar"
                icon={<TbDatabaseSearch />}
              />
              <AdminNavItem
                label="Inserir registro"
                route="inserir"
                icon={<TbDatabasePlus />}
              />
              <AdminNavItem
                label="Controle de usuários"
                route="usuarios"
                icon={<TbUsersGroup />}
              />
            </ul>
          </nav>
        </aside>
        <main className="w-3/4">
          <Outlet />
        </main>
      </div>
    </Container>
  );
}

function AdminNavItem({
  label,
  route,
  icon,
}: {
  label: string;
  route: string;
  icon: React.ReactNode;
}) {
  return (
    <IconContext.Provider value={{ size: "2rem" }}>
      <li>
        <NavLink
          prefetch="intent"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-gradient-to-r from-cyan-600 to-cyan-500 text-white"
                : "bg-neutral-100 text-cyan-600"
            } flex items-center gap-2 rounded-2xl px-5 py-1 text-center font-bold underline-offset-4 hover:underline`
          }
          to={route}
        >
          {icon}
          {label}
        </NavLink>
      </li>
    </IconContext.Provider>
  );
}
