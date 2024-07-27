import { Link, NavLink } from "@remix-run/react";

export function Header() {
  return (
    <header>
      <div className="flex h-20 items-center justify-between bg-white px-6">
        <Link to="/">
          <img
            className="h-16 max-w-md text-balance"
            src="/images/lppfb-logo.jpg"
            alt="UFMS - LABORATÓRIO DE PURIFICAÇÃO DE PROTEÍNAS E SUAS FUNÇÕES BIOLÓGICAS"
          />
        </Link>
        <div className="flex gap-4">
          <NavLink prefetch="intent" to="/entrar">
            <button
              type="button"
              className="rounded-full bg-cyan-600 px-5 py-1 text-lg font-bold text-white"
            >
              Entrar
            </button>
          </NavLink>
          <NavLink prefetch="intent" to="/cadastrar">
            <button
              type="button"
              className="rounded-full bg-neutral-600 px-5 py-1 text-lg font-bold text-white"
            >
              Cadastrar
            </button>
          </NavLink>
        </div>
      </div>
      <nav className="bg-neutral-200 py-1">
        <ul className="mx-20 flex flex-wrap items-center gap-10 text-lg font-bold">
          <li>
            <NavLink
              prefetch="intent"
              to="/"
              className={({ isActive }) =>
                `${
                  isActive ? "underline" : ""
                } underline-offset-4 hover:underline`
              }
            >
              Início
            </NavLink>
          </li>
          <li>
            <NavLink
              prefetch="intent"
              to="/pesquisa"
              className={({ isActive }) =>
                `${
                  isActive ? "underline" : ""
                } underline-offset-4 hover:underline`
              }
            >
              Pesquisar
            </NavLink>
          </li>
          <li>
            <NavLink
              prefetch="intent"
              to="/glossario"
              className={({ isActive }) =>
                `${
                  isActive ? "underline" : ""
                } underline-offset-4 hover:underline`
              }
            >
              Glossário
            </NavLink>
          </li>
          <li>
            <NavLink
              prefetch="intent"
              to="/fotos"
              className={({ isActive }) =>
                `${
                  isActive ? "underline" : ""
                } underline-offset-4 hover:underline`
              }
            >
              Fotos
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
