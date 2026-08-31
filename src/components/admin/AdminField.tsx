import { useEffect, useState } from "react";
import type { FieldConfig } from "../../lib/adminResources";
import type { OptionItem } from "../../lib/adminTypes";
import { adminApi } from "../../lib/adminApi";
import { IconImage } from "../icons";

export const inputCls =
  "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-soft outline-none transition focus:border-florante-500 focus:ring-2 focus:ring-florante-500/30 disabled:opacity-60";

function toDateTimeLocal(value: unknown): string {
  if (!value) return "";
  const iso = String(value);
  return iso.length >= 16 ? iso.slice(0, 16) : iso;
}

interface Props {
  field: FieldConfig;
  value: unknown;
  onChange: (value: unknown) => void;
  options?: OptionItem[];
  optionsLoading?: boolean;
}

export function AdminField({ field, value, onChange, options, optionsLoading }: Props) {
  const [jsonError, setJsonError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const inputProps = {
    id: field.key,
    name: field.key,
    placeholder: field.placeholder,
    required: field.required,
  };

  useEffect(() => {
    setJsonError(false);
  }, [value]);

  let control: React.ReactNode;

  switch (field.type) {
    case "textarea":
      control = (
        <textarea
          {...inputProps}
          rows={field.rows || 4}
          className={inputCls}
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
      break;
    case "number":
      control = (
        <input
          {...inputProps}
          type="number"
          className={inputCls}
          value={(value as number | null) ?? ""}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
        />
      );
      break;
    case "checkbox":
      control = (
        <button
          type="button"
          role="switch"
          aria-checked={!!value}
          onClick={() => onChange(!value)}
          className={`relative h-6 w-11 shrink-0 rounded-full transition ${
            value ? "bg-accent-grad" : "bg-gray-200"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
              value ? "left-[22px]" : "left-0.5"
            }`}
          />
        </button>
      );
      break;
    case "select":
      control = (
        <select
          {...inputProps}
          className={inputCls}
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">— Select —</option>
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      );
      break;
    case "datetime":
      control = (
        <input
          {...inputProps}
          type="datetime-local"
          className={inputCls}
          value={toDateTimeLocal(value)}
          onChange={(e) => onChange(e.target.value ? new Date(e.target.value).toISOString() : null)}
        />
      );
      break;
    case "array": {
      const arr = Array.isArray(value) ? (value as string[]) : [];
      control = (
        <textarea
          {...inputProps}
          rows={field.rows || 4}
          className={`${inputCls} font-mono text-xs`}
          value={arr.join("\n")}
          onChange={(e) =>
            onChange(
              e.target.value
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean)
            )
          }
        />
      );
      break;
    }
    case "json": {
      const text = value === null || value === undefined || value === "" ? "" : JSON.stringify(value, null, 2);
      control = (
        <div>
          <textarea
            {...inputProps}
            rows={field.rows || 5}
            className={`${inputCls} font-mono text-xs ${jsonError ? "border-red-400 ring-2 ring-red-400/30" : ""}`}
            value={text}
            onChange={(e) => {
              const raw = e.target.value.trim();
              if (!raw) {
                setJsonError(false);
                onChange(null);
                return;
              }
              try {
                onChange(JSON.parse(raw));
                setJsonError(false);
              } catch {
                setJsonError(true);
              }
            }}
          />
          {jsonError && (
            <p className="mt-1 text-xs font-medium text-red-600">Invalid JSON.</p>
          )}
        </div>
      );
      break;
    }
    case "m2m": {
      const selected = Array.isArray(value) ? (value as number[]) : [];
      control = (
        <div className="space-y-2">
          {optionsLoading ? (
            <p className="text-sm text-gray-400">Loading…</p>
          ) : options?.length ? (
            <div className="max-h-52 space-y-1.5 overflow-y-auto rounded-xl border border-gray-200 p-2.5">
              {options.map((o) => {
                const label = String(o[field.labelField || "name"] ?? o.id);
                const checked = selected.includes(Number(o.id));
                return (
                  <label
                    key={o.id}
                    className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-gray-700 hover:bg-florante-50"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        onChange(
                          checked
                            ? selected.filter((n) => n !== Number(o.id))
                            : [...selected, Number(o.id)]
                        )
                      }
                      className="h-4 w-4 rounded border-gray-300 accent-florante-700"
                    />
                    <span className="truncate">{label}</span>
                  </label>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No options available.</p>
          )}
        </div>
      );
      break;
    }
    case "fk":
      control = (
        <select
          {...inputProps}
          className={inputCls}
          value={value ? Number(value) : ""}
          onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">— None —</option>
          {optionsLoading ? (
            <option disabled>Loading…</option>
          ) : (
            options?.map((o) => (
              <option key={o.id} value={Number(o.id)}>
                {String(o[field.labelField || "name"] ?? o.id)}
              </option>
            ))
          )}
        </select>
      );
      break;
    case "image": {
      const url = (value as string) || "";
      async function handleFile(file: File) {
        setUploading(true);
        try {
          const fd = new FormData();
          fd.append("file", file);
          const res = await adminApi.post<{ url: string }>("/upload/", fd, {
            headers: { "Content-Type": undefined },
          });
          onChange(res.data.url);
        } catch {
          window.alert("Upload failed. Please try again.");
        } finally {
          setUploading(false);
        }
      }
      control = (
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-moss/40">
              {url ? (
                <img src={url} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <IconImage className="text-gray-300" size={22} />
              )}
            </span>
            <div className="flex flex-col items-start gap-2">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-florante-200 bg-white px-4 py-2 text-sm font-semibold text-florante-800 shadow-soft transition hover:bg-florante-50 disabled:opacity-60">
                {uploading ? "Uploading…" : url ? "Replace photo" : "Upload photo"}
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploading}
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(f);
                    e.target.value = "";
                  }}
                />
              </label>
              {url && !uploading && (
                <button
                  type="button"
                  onClick={() => onChange("")}
                  className="text-xs font-semibold text-red-500 transition hover:text-red-600"
                >
                  Remove photo
                </button>
              )}
            </div>
          </div>
          {url && <input type="text" className={`${inputCls} font-mono text-xs`} value={url} readOnly />}
        </div>
      );
      break;
    }
    default:
      control = (
        <input
          {...inputProps}
          type={field.type === "email" ? "email" : field.type === "url" ? "url" : "text"}
          className={inputCls}
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }

  return (
    <div>
      <label htmlFor={field.key} className="mb-1.5 flex items-center gap-1 text-sm font-semibold text-florante-900">
        {field.label}
        {field.required && <span className="text-accent-dark">*</span>}
      </label>
      {control}
      {field.help && <p className="mt-1 text-xs text-gray-400">{field.help}</p>}
    </div>
  );
}
