import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { adminApi } from "../../lib/adminApi";
import type { OptionItem } from "../../lib/adminTypes";
import { RESOURCE_MAP, type FieldConfig } from "../../lib/adminResources";
import { AdminField } from "../../components/admin/AdminField";
import { Spinner } from "../../components/Spinner";
import { ErrorState } from "../../components/ErrorState";
import { IconArrowRight, IconChevronRight, IconClose, IconSearch } from "../../components/icons";

type Row = Record<string, unknown>;

function humanize(value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value).replaceAll("_", " ");
}

function defaultFor(field: FieldConfig): unknown {
  switch (field.type) {
    case "checkbox":
      return false;
    case "array":
      return [];
    case "m2m":
      return [];
    case "fk":
      return null;
    case "number":
      return 0;
    case "datetime":
    case "json":
      return null;
    default:
      return "";
  }
}

export function AdminResource() {
  const { resource } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const config = resource ? RESOURCE_MAP[resource] : undefined;

  const [items, setItems] = useState<Row[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editing, setEditing] = useState<number | "new" | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const [form, setForm] = useState<Row>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [options, setOptions] = useState<Record<string, OptionItem[]>>({});
  const [optionsLoading, setOptionsLoading] = useState<Record<string, boolean>>({});

  const optionsUrls = useMemo(() => {
    if (!config) return [] as string[];
    return [...new Set(config.fields.map((f) => f.optionsUrl).filter(Boolean))] as string[];
  }, [config]);

  const loadOptions = useCallback(async () => {
    await Promise.all(
      optionsUrls.map(async (url) => {
        setOptionsLoading((s) => ({ ...s, [url]: true }));
        try {
          const res = await adminApi.get<OptionItem[]>(`/${url}/`);
          setOptions((s) => ({ ...s, [url]: res.data }));
        } catch {
          setOptions((s) => ({ ...s, [url]: [] }));
        } finally {
          setOptionsLoading((s) => ({ ...s, [url]: false }));
        }
      })
    );
  }, [optionsUrls]);

  const loadItems = useCallback(async () => {
    if (!config) return;
    setLoading(true);
    setError(null);
    try {
      const res = await adminApi.get<Row[]>(`/${config.key}/`, {
        params: search ? { search } : {},
      });
      setItems(res.data);
    } catch (err: unknown) {
      setError(
        (err as { response?: { data?: { detail?: string } } }).response?.data?.detail ||
          "Unable to load records."
      );
    } finally {
      setLoading(false);
    }
  }, [config, search]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  useEffect(() => {
    if (optionsUrls.length) loadOptions();
  }, [optionsUrls, loadOptions]);

  useEffect(() => {
    const editId = searchParams.get("edit");
    if (editId && config) {
      const id = Number(editId);
      if (!Number.isNaN(id)) {
        const found = items.find((i) => Number(i.id) === id);
        if (found) {
          setForm(found);
          setEditing(id);
        }
      }
    } else {
      setEditing(null);
    }
  }, [searchParams, items, config]);

  if (!config) {
    return <ErrorState message="Unknown admin resource." />;
  }

  function startNew() {
    const base: Row = {};
    for (const f of config!.fields) base[f.key] = defaultFor(f);
    setForm(base);
    setSaveError(null);
    setEditing("new");
  }

  async function loadSingle(id: number) {
    setSaving(false);
    setSaveError(null);
    try {
      const res = await adminApi.get<Row>(`/${config!.key}/${id}/`);
      setForm(res.data);
      setEditing(id);
    } catch {
      /* fall back to list */
    }
  }

  function cancelEdit() {
    setEditing(null);
    setSaveError(null);
    if (searchParams.get("edit")) setSearchParams({});
  }

  async function handleSave() {
    if (!config) return;
    setSaving(true);
    setSaveError(null);
    const payload: Record<string, unknown> = {};
    for (const f of config.fields) {
      if (form[f.key] !== undefined) payload[f.key] = form[f.key];
    }
    try {
      if (editing === "new") {
        await adminApi.post(`/${config.key}/`, payload);
      } else if (typeof editing === "number") {
        await adminApi.patch(`/${config.key}/${editing}/`, payload);
      }
      cancelEdit();
      await loadItems();
    } catch (err: unknown) {
      const data = (err as { response?: { data?: unknown } }).response?.data;
      let message = "Unable to save.";
      if (data && typeof data === "object") {
        const entries = Object.entries(data as Record<string, unknown>);
        message = entries
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : String(v)}`)
          .join("; ");
      }
      setSaveError(message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm(`Delete this ${config!.singular.toLowerCase()}? This cannot be undone.`)) return;
    try {
      await adminApi.delete(`/${config!.key}/${id}/`);
      if (editing === id) setEditing(null);
      await loadItems();
    } catch {
      window.alert("Unable to delete this record.");
    }
  }

  const optionPropsFor = (f: FieldConfig) => ({
    options: f.optionsUrl ? options[f.optionsUrl] : undefined,
    optionsLoading: f.optionsUrl ? optionsLoading[f.optionsUrl] : false,
  });

  return (
    <div className="space-y-6">
      {editing === null ? (
        <>
          {/* Header band */}
          <div className="relative overflow-hidden rounded-[2rem] bg-green-grad shadow-lift">
            <div
              className="pointer-events-none absolute inset-0 bg-grid-dark opacity-70"
              style={{ backgroundSize: "40px 40px" }}
            />
            <div className="pointer-events-none absolute inset-0 bg-hero-mesh" />
            <span className="pointer-events-none absolute -right-3 -top-8 select-none font-heading text-[8rem] font-bold leading-none text-white/[0.05]">
              {config.label[0]?.toUpperCase()}
            </span>
            <div className="relative flex flex-wrap items-center justify-between gap-4 px-6 py-6 sm:px-8">
              <div>
                <span className="eyebrow-dark">Records</span>
                <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white">
                  {config.label}
                </h1>
                <p className="mt-1.5 text-sm text-white/60">
                  {items.length} record{items.length === 1 ? "" : "s"} in the index
                  {search ? ` · filtered by “${search}”` : ""}
                </p>
              </div>
              {config.allowCreate && (
                <button
                  onClick={startNew}
                  className="inline-flex items-center gap-2 rounded-full bg-accent-grad px-5 py-2.5 text-sm font-bold text-florante-950 shadow-glow transition hover:brightness-105"
                >
                  + New {config.singular}
                </button>
              )}
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <IconSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-florante-400" size={18} />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${config.label.toLowerCase()}…`}
              className="w-full rounded-full border border-florante-100 bg-white py-3 pl-11 pr-4 text-sm shadow-card outline-none transition focus:border-florante-500 focus:ring-4 focus:ring-florante-500/15"
            />
          </div>

          {loading ? (
            <Spinner label="Loading" />
          ) : error ? (
            <ErrorState message={error} />
          ) : items.length === 0 ? (
            <div className="admin-corners relative rounded-[2rem] border border-dashed border-florante-200 bg-white/70 p-16 text-center shadow-card">
              <p className="font-heading text-xl font-semibold text-florante-800">
                No {config.label.toLowerCase()}
              </p>
              <p className="mt-1.5 text-sm text-gray-500">
                {search ? "Try a different search." : `Create your first ${config.singular.toLowerCase()} to get started.`}
              </p>
              {config.allowCreate && !search && (
                <button
                  onClick={startNew}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-florante-700 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-florante-800 hover:shadow-glow"
                >
                  + New {config.singular}
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item, i) => (
                <div
                  key={Number(item.id)}
                  className="admin-corners relative flex items-center gap-4 rounded-2xl border border-florante-100 bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift sm:p-5"
                >
                  <span className="admin-index">{String(i + 1).padStart(2, "0")}</span>
                  <button onClick={() => loadSingle(Number(item.id))} className="min-w-0 flex-1 text-left">
                    <p className="truncate font-heading text-base font-semibold text-florante-900">
                      {humanize(item[config.titleField])}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                      {config.subtitleFields?.map((f) => (
                        <span key={f} className="truncate text-xs text-gray-400">
                          {humanize(item[f])}
                        </span>
                      ))}
                    </div>
                  </button>
                  <div className="flex shrink-0 items-center gap-1.5">
                    {config.allowDelete && (
                      <button
                        onClick={() => handleDelete(Number(item.id))}
                        className="rounded-xl p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                        title="Delete"
                      >
                        <IconClose size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => loadSingle(Number(item.id))}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-florante-50 text-florante-700 transition hover:bg-florante-700 hover:text-white"
                      title="Edit"
                    >
                      <IconChevronRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="overflow-hidden rounded-[2rem] border border-florante-100 bg-white shadow-lift">
          {/* Form header */}
          <div className="relative overflow-hidden bg-green-grad px-6 py-5 sm:px-8">
            <div
              className="pointer-events-none absolute inset-0 bg-grid-dark opacity-60"
              style={{ backgroundSize: "36px 36px" }}
            />
            <div className="relative flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={cancelEdit}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                <IconArrowRight className="rotate-180" size={15} />
                Back to {config.label.toLowerCase()}
              </button>
              <h1 className="font-heading text-lg font-bold text-white">
                {editing === "new" ? `New ${config.singular}` : `Edit ${config.singular}`}
              </h1>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            {/* Form Guidance Banner */}
            {config.formGuide && (
              <div className="border-b border-florante-100 bg-florante-50/60 px-6 py-4 sm:px-8">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-florante-900">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/30 text-florante-900">
                      💡
                    </span>
                    Form Guidance & Field Requirements
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowGuide((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-florante-200 bg-white px-3 py-1 text-xs font-semibold text-florante-700 shadow-soft transition hover:bg-florante-100"
                  >
                    {showGuide ? "Hide Guidance" : "Show Guidance"}
                  </button>
                </div>

                {showGuide && (
                  <div className="mt-3 space-y-3 rounded-2xl border border-florante-200 bg-white p-4 text-xs text-gray-600 shadow-card">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-florante-100 pb-2.5">
                      <p className="font-semibold text-florante-900">{config.formGuide.summary}</p>
                      <a
                        href={config.formGuide.publicUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-florante-700 underline hover:text-florante-900"
                      >
                        Target page: {config.formGuide.publicUrl} ↗
                      </a>
                    </div>
                    <ul className="space-y-1.5 pl-1">
                      {config.formGuide.tips.map((tip) => (
                        <li key={tip} className="flex items-start gap-2">
                          <span className="mt-0.5 text-accent-dark font-bold">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="grid gap-6 px-6 py-8 sm:px-8 lg:grid-cols-2">
              {config.fields.map((f) => (
                <div key={f.key} className={f.type === "textarea" || f.type === "json" ? "lg:col-span-2" : ""}>
                  <AdminField
                    field={f}
                    value={form[f.key]}
                    onChange={(v) => setForm((prev) => ({ ...prev, [f.key]: v }))}
                    {...optionPropsFor(f)}
                  />
                </div>
              ))}
              {saveError && (
                <p className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700 lg:col-span-2">
                  {saveError}
                </p>
              )}
            </div>

            <div className="sticky bottom-0 z-10 border-t border-florante-100 bg-white/95 px-6 py-4 backdrop-blur sm:px-8">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-full bg-accent-grad px-6 py-2.5 text-sm font-bold text-florante-950 shadow-glow transition hover:brightness-105 disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Save changes"}
                  <IconArrowRight size={15} />
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="rounded-full border border-florante-200 bg-white px-6 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-florante-50"
                >
                  Cancel
                </button>
                {typeof editing === "number" && config.allowDelete && (
                  <button
                    type="button"
                    onClick={() => handleDelete(editing)}
                    className="ml-auto rounded-full border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    Delete {config.singular.toLowerCase()}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
