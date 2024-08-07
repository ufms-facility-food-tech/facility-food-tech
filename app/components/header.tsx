import { Link, NavLink } from "@remix-run/react";
import type { components } from "~/api-schema";

export function Header({
  user,
}: {
  user: components["schemas"]["JwtResponse"] | null;
}) {
  return (
    <header>
      <div className="min-h-26 flex items-center justify-between bg-white px-4">
        <Link to="/">
          <img
            className="my-2 h-24 max-w-md text-balance text-center"
            src="/images/static/lppfb-logo.jpg"
            alt="UFMS - LABORATÓRIO DE PURIFICAÇÃO DE PROTEÍNAS E SUAS FUNÇÕES BIOLÓGICAS"
          />
        </Link>
        {user ? (
          <div className="my-6 flex flex-wrap justify-end gap-3">
            <NavLink
              prefetch="intent"
              to="/admin"
              className="rounded-full bg-cyan-500 px-6 py-2 text-lg font-bold text-white"
            >
              {user.displayName as string}
            </NavLink>
            <NavLink
              to="/logout"
              className="rounded-full bg-neutral-100 px-6 py-2 text-lg font-bold outline outline-2 -outline-offset-2 outline-neutral-200 focus-visible:outline-inherit"
            >
              Sair
            </NavLink>
          </div>
        ) : (
          <div className="my-6 flex flex-wrap justify-end gap-3">
            <NavLink
              prefetch="intent"
              to="/login"
              className="rounded-full bg-cyan-500 px-6 py-2 text-lg font-bold text-white"
            >
              Entrar
            </NavLink>
            <NavLink
              prefetch="intent"
              to="/register"
              className="rounded-full bg-neutral-100 px-6 py-2 text-lg font-bold outline outline-2 -outline-offset-2 outline-neutral-200 focus-visible:outline-inherit"
            >
              Cadastrar
            </NavLink>
          </div>
        )}
      </div>
      <nav className="bg-neutral-100 py-3">
        <ul className="flex flex-wrap items-center justify-evenly gap-2 text-lg font-bold sm:mx-20 sm:justify-normal sm:gap-12">
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
