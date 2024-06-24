import { NavLink } from "@remix-run/react";

export function Header() {
  const isAdmin = false;

  const routes = [
    { name: "Início", path: "/" },
    { name: "Pesquisar", path: "/pesquisa" },
    { name: "Glossário", path: "/glossario" },
    { name: "Fotos", path: "/fotos" },
  ];

  return (
    <header>
      <div className="flex h-20 items-center justify-between bg-white px-6">
        <img
          className="h-16 max-w-md text-balance"
          src="/images/lppfb-logo.jpg"
          alt="UFMS - LABORATÓRIO DE PURIFICAÇÃO DE PROTEÍNAS E SUAS FUNÇÕES BIOLÓGICAS"
        />
        {isAdmin ? (
          <div className="font-bold">Acesso Administrador</div>
        ) : (
          <div className="flex gap-4">
            <NavLink prefetch="intent" to="/entrar">
              <button className="rounded-full bg-cyan-600 px-5 py-1 text-lg font-bold text-white">
                Entrar
              </button>
            </NavLink>
            <NavLink prefetch="intent" to="/cadastrar">
              <button className="rounded-full bg-neutral-600 px-5 py-1 text-lg font-bold text-white">
                Cadastrar
              </button>
            </NavLink>
          </div>
        )}
      </div>
      <nav className="bg-neutral-200 py-1">
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {routes.map((route) => (
            <li key={route.path}>
              <NavLink
                prefetch="intent"
                to={route.path}
                className={({ isActive }) =>
                  `${
                    isActive ? "underline" : ""
                  } underline-offset-4 hover:underline`
                }
              >
                {route.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
