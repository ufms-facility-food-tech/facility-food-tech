import type {
  ButtonHTMLAttributes,
  HTMLInputTypeAttribute,
  ReactNode,
} from "react";

export function SubmitButton({
  children,
  type,
}: {
  children: ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}) {
  return (
    <button
      type={type || "submit"}
      className="rounded-xl bg-gradient-to-b from-white to-[#d7d7d7] px-4 py-2 outline outline-1 outline-[#cccccc]"
    >
      {children}
    </button>
  );
}

export function TextInput(props: {
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute;
}) {
  return (
    <label className="flex flex-col text-xl text-cyan-700">
      {props.label}
      <input
        className="mt-1 rounded-xl border bg-white p-2 text-base text-black"
        name={props.name}
        type={props.type || "text"}
      />
    </label>
  );
}

export function TextAreaInput(props: {
  name: string;
  label: string;
  rows?: number;
}) {
  return (
    <label className="flex flex-col text-xl text-cyan-700">
      {props.label}
      <textarea
        className="mt-1 overflow-auto rounded-xl border bg-white p-2 text-base text-black"
        name={props.name}
        rows={props.rows || 4}
      />
    </label>
  );
}
