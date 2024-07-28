import type { ReactNode } from "react";

export function Container({
  children,
  title,
}: {
  children?: ReactNode;
  title?: string;
}) {
  return (
    <div className="flex my-auto h-full flex-col items-center">
      <div className="h-full w-full bg-white px-9 py-2 md:my-8 md:w-11/12 lg:w-5/6 rounded-b-2xl md:rounded-t-2xl">
        {title && (
          <h1 className="border-b-2 border-neutral-100 pb-4 mb-4 mt-4 text-3xl font-bold text-cyan-600">{title}</h1>
        )}
        {children}
      </div>
    </div>
  );
}
