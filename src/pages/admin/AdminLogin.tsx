import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { adminApi, setAdminToken } from "../../lib/adminApi";
import { ADMIN_DASHBOARD } from "../../lib/adminPaths";
import {
  IconArrowRight,
  IconChart,
  IconEye,
  IconEyeOff,
  IconLock,
  IconSparkles,
  IconUsers,
} from "../../components/icons";

export function AdminLogin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isTimeout = searchParams.get("reason") === "timeout";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await adminApi.post("/login/", { email, password });
      setAdminToken(res.data.token);
      navigate(ADMIN_DASHBOARD, { replace: true });
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } }).response?.status;
      const detail = (err as { response?: { data?: { detail?: string } } }).response?.data?.detail;
      if (status === 429) {
        setError("Too many sign-in attempts. Please wait a minute before trying again.");
      } else {
        setError(detail || "Unable to sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-green-grad">
      <div
        className="pointer-events-none absolute inset-0 bg-grid-dark opacity-60"
        style={{ backgroundSize: "44px 44px" }}
      />
      <div className="pointer-events-none absolute -top-40 left-1/3 h-96 w-[44rem] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-96 w-[36rem] rounded-full bg-florante-500/25 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-6xl items-center gap-16 px-6 py-12 lg:px-10">
        {/* Editorial panel */}
        <div className="hidden flex-1 lg:block">
          <span className="eyebrow-dark">
            <IconLock size={12} /> Restricted area
          </span>
          <h1 className="mt-6 font-heading text-5xl font-bold leading-[1.05] tracking-tight text-white">
            The Florante
            <br />
            <span className="text-gradient-bright">control room</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/60">
            Everything that powers florante.tech — content, analytics and
            leads — from a single private studio.
          </p>

          <div className="mt-10 space-y-4">
            {[
              {
                icon: <IconSparkles size={16} />,
                title: "Shape the story",
                text: "Edit products, solutions and articles that visitors read.",
              },
              {
                icon: <IconChart size={16} />,
                title: "Follow the attention",
                text: "See what people actually spend time on and where they act.",
              },
              {
                icon: <IconUsers size={16} />,
                title: "Win the pipeline",
                text: "Qualify and steer every lead from first touch to close.",
              },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-accent-soft">
                  {f.icon}
                </span>
                <div>
                  <p className="font-heading text-sm font-semibold text-white">{f.title}</p>
                  <p className="mt-0.5 max-w-sm text-sm text-white/55">{f.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex items-center gap-4">
            <span className="admin-rule w-24" />
            <span className="font-mono text-xs tracking-widest text-white/30">
              FLORANTE / STUDIO
            </span>
          </div>
        </div>

        {/* Sign-in panel */}
        <div className="w-full max-w-[26rem] flex-1 lg:flex-none">
          <div className="mb-7 text-center lg:hidden">
            <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
              <span className="absolute inset-0 animate-pulse-soft rounded-2xl bg-accent/25 blur-lg" />
              <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-accent backdrop-blur">
                <IconLock size={26} />
              </span>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="admin-corners relative rounded-[2rem] border border-white/60 bg-white/95 p-8 shadow-lift backdrop-blur"
          >
            {isTimeout && (
              <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-amber-800 shadow-sm">
                <span className="font-semibold text-amber-900">🔒 Session Expired:</span> You were automatically logged out after 10 minutes of inactivity for security.
              </div>
            )}

            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-florante-700 text-accent-soft">
                <IconLock size={20} />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400">
                  Authentication
                </p>
                <h2 className="font-heading text-xl font-bold text-florante-900">Sign in</h2>
              </div>
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium text-gray-600">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                autoFocus
                autoComplete="email"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[15px] font-normal text-gray-900 shadow-soft outline-none transition placeholder:font-normal placeholder:text-gray-400 focus:border-florante-500 focus:ring-4 focus:ring-florante-500/15"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="password" className="mb-1.5 block text-[13px] font-medium text-gray-600">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-12 text-[15px] font-normal text-gray-900 shadow-soft outline-none transition placeholder:font-normal placeholder:text-gray-400 focus:border-florante-500 focus:ring-4 focus:ring-florante-500/15"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  aria-label={show ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-400 transition hover:bg-florante-50 hover:text-florante-700"
                >
                  {show ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="mb-4 rounded-xl border border-red-100 bg-red-50 px-3.5 py-2.5 text-sm font-normal text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-grad py-3 text-[15px] font-bold text-florante-950 shadow-glow transition hover:brightness-105 disabled:opacity-60"
            >
              {loading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-florante-900/30 border-t-florante-900" />
              ) : (
                <>
                  Enter the studio
                  <IconArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <a
            href="/"
            className="mt-6 block text-center text-sm font-normal text-white/60 transition hover:text-white"
          >
            ← Back to website
          </a>
        </div>
      </div>
    </div>
  );
}
