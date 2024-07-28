import type {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

export function SubmitButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="submit"
      className="rounded-full bg-cyan-500 px-6 py-2 text-lg font-bold text-white"
    >
      {children}
    </button>
  );
}

export function TextInput({
  name,
  label,
  type,
  onChange,
  autoComplete,
}: {
  name?: InputHTMLAttributes<HTMLInputElement>["name"];
  label: string;
  type?: HTMLInputTypeAttribute;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  autoComplete?: InputHTMLAttributes<HTMLInputElement>["autoComplete"];
}) {
  return (
    <label className="flex flex-col text-lg text-cyan-600">
      {label}
      <input
        className="mt-1 rounded-xl border bg-neutral-50 p-2 text-base text-black"
        name={name}
        type={type}
        onChange={onChange}
        autoComplete={autoComplete}
      />
    </label>
  );
}

export function TextAreaInput({
  name,
  label,
  rows,
  onChange,
}: {
  name?: TextareaHTMLAttributes<HTMLTextAreaElement>["name"];
  label: string;
  rows?: TextareaHTMLAttributes<HTMLTextAreaElement>["rows"];
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}) {
  return (
    <label className="flex flex-col text-lg text-cyan-600">
      {label}
      <textarea
        className="mt-1 resize-none overflow-auto rounded-xl border bg-neutral-50 p-2 text-base text-black"
        name={name}
        rows={rows || 4}
        onChange={onChange}
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
  name?: InputHTMLAttributes<HTMLInputElement>["name"];
  label: string;
  checked?: InputHTMLAttributes<HTMLInputElement>["defaultChecked"];
  onChange?: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <label className="flex gap-2 text-lg text-cyan-600">
      <input
        type="checkbox"
        name={name}
        defaultChecked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
}

export function SelectInput({
  name,
  label,
  options,
  onChange,
}: {
  name?: SelectHTMLAttributes<HTMLSelectElement>["name"];
  label: string;
  options: Array<{ value: string; label: string }>;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <label className="flex flex-col text-lg text-cyan-600">
      {label}
      <select
        name={name}
        className="mt-1 rounded-xl border bg-neutral-50 p-2 text-base text-black"
        onChange={onChange}
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
