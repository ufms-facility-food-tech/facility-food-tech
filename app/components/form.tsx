import type { ComponentProps, ReactNode } from "react";

export function SubmitButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="submit"
      className="rounded-full bg-gradient-to-r from-cyan-600 to-cyan-500 px-6 py-2 text-lg font-bold text-white"
    >
      {children}
    </button>
  );
}

export function TextInput({
  label,
  ...props
}: {
  label?: string;
} & ComponentProps<"input">) {
  if (!label)
    return (
      <input
        className="mt-1 w-full rounded-xl border bg-neutral-50 p-2 text-base text-black disabled:bg-neutral-200"
        {...props}
      />
    );

  return (
    <label
      className="flex flex-col text-cyan-600 aria-disabled:text-neutral-500"
      aria-disabled={props.disabled}
    >
      {label}
      <input
        className="mt-1 rounded-xl border bg-neutral-50 p-2 text-base text-black disabled:bg-neutral-200"
        {...props}
      />
    </label>
  );
}

export function TextAreaInput({
  label,
  ...props
}: {
  label: string;
} & ComponentProps<"textarea">) {
  return (
    <label className="flex flex-col text-base text-cyan-600">
      {label}
      <textarea
        className="mt-1 resize-none overflow-auto rounded-xl border bg-neutral-50 p-2 text-base text-black"
        {...props}
      />
    </label>
  );
}

export function CheckboxInput({
  label,
  ...props
}: {
  label: string;
} & ComponentProps<"input">) {
  return (
    <label className="flex gap-2 text-cyan-600">
      <input type="checkbox" {...props} />
      {label}
    </label>
  );
}

export function SelectInput({
  label,
  options,
  ...props
}: {
  label: string;
  options: Array<{ value: string; label: string }>;
} & ComponentProps<"select">) {
  return (
    <label className="flex flex-col text-cyan-600">
      {label}
      <select
        className="mt-1 rounded-xl border bg-neutral-50 p-2 text-base text-black"
        {...props}
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

export function FormErrorMessage({ errors }: { errors?: Array<string> }) {
  if (!errors) return null;
  return (
    <p className="rounded-xl bg-red-50 p-2 text-sm text-red-800">
      {errors.join(" ")}
    </p>
  );
}
