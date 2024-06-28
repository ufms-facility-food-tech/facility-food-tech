import type { ReactNode } from "react";

export function Container({
  children,
  title,
}: {
  children?: ReactNode;
  title?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="my-8 w-full rounded-2xl bg-neutral-100 px-9 py-2 md:w-5/6">
        {title && (
          <h1 className="m-3 text-center text-3xl text-cyan-700">{title}</h1>
        )}
        {children}
      </div>
    </div>
  );
}
