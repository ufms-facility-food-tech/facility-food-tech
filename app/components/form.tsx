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
      className="rounded-full bg-cyan-600 px-5 py-1 text-lg font-bold text-white"
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
