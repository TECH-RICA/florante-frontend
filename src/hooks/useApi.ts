import { useCallback, useEffect, useState } from "react";
import api from "../lib/api";

interface State<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  status: number | null;
}

export function useApi<T>(path: string | null) {
  const [state, setState] = useState<State<T>>({ data: null, loading: !!path, error: null, status: null });

  const load = useCallback(async () => {
    if (!path) return;
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await api.get<T>(path);
      setState({ data: res.data, loading: false, error: null, status: res.status });
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { detail?: string } } }).response?.data?.detail ||
        "Something went wrong. Please try again.";
      const status = (err as { response?: { status?: number } }).response?.status ?? null;
      setState({ data: null, loading: false, error: message, status });
    }
  }, [path]);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, notFound: state.status === 404, reload: load };
}