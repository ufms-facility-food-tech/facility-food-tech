import type {
  ButtonHTMLAttributes,
  ChangeEvent,
  Dispatch,
  HTMLInputTypeAttribute,
  ReactNode,
  SetStateAction,
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

export function TextInput({
  name,
  label,
  type,
}: {
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute;
}) {
  return (
    <label className="flex flex-col text-xl text-cyan-700">
      {label}
      <input
        className="mt-1 rounded-xl border bg-white p-2 text-base text-black"
        name={name}
        type={type || "text"}
      />
    </label>
  );
}

export function TextAreaInput({
  name,
  label,
  rows,
}: {
  name: string;
  label: string;
  rows?: number;
}) {
  return (
    <label className="flex flex-col text-xl text-cyan-700">
      {label}
      <textarea
        className="mt-1 overflow-auto rounded-xl border bg-white p-2 text-base text-black"
        name={name}
        rows={rows || 4}
      />
    </label>
  );
}

export function CheckboxInput({
  name,
  label,
  checked,
  onChange,
}: {
  name: string;
  label: string;
  checked?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex items-center gap-4">
      <input
        type="checkbox"
        name={name}
        checked={checked || false}
        onChange={onChange}
      />
      <label className="text-xl text-cyan-700">{label}</label>
    </div>
  );
}

export function SelectInput({
  label,
  options,
  setSelection,
}: {
  label: string;
  options: Array<{ value: string; label: string }>;
  setSelection: Dispatch<SetStateAction<string>>;
}) {
  return (
    <label className="flex flex-col text-xl text-cyan-700">
      {label}
      <select
        className="mt-1 rounded-xl border bg-white p-2 text-base text-black"
        onChange={(e) => setSelection(e.target.value)}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}
