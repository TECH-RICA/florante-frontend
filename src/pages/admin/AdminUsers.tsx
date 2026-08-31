import { useEffect, useState } from "react";
import { adminApi } from "../../lib/adminApi";
import { Spinner } from "../../components/Spinner";
import { ErrorState } from "../../components/ErrorState";
import {
  IconArrowRight, IconCheck, IconShield, IconUser,
  IconClose, IconClock, IconMail,
} from "../../components/icons";

interface StaffUser {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_staff: boolean;
  is_superuser: boolean;
  is_active: boolean;
  date_joined?: string;
  last_login?: string | null;
}

function formatDate(iso?: string | null) {
  if (!iso) return "Never";
  return new Date(iso).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" });
}

function fullName(u: StaffUser) {
  return `${u.first_name || ""} ${u.last_name || ""}`.trim() || u.username;
}

// ─── Profile Modal ────────────────────────────────────────────────────────────
function ProfileModal({
  user,
  isSelf,
  onClose,
  onToggleActive,
  onDelete,
}: {
  user: StaffUser;
  isSelf: boolean;
  onClose: () => void;
  onToggleActive: (u: StaffUser) => Promise<void>;
  onDelete: (u: StaffUser) => Promise<void>;
}) {
  const protected_ = user.is_superuser || isSelf;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-florante-950/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-florante-100 bg-white shadow-2xl">
        {/* Header */}
        <div className="relative overflow-hidden bg-green-grad px-6 py-6 sm:px-8">
          <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-60" style={{ backgroundSize: "36px 36px" }} />
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent-grad font-heading text-2xl font-bold text-florante-950 shadow-glow">
                {(fullName(user)[0] || "?").toUpperCase()}
              </span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-heading text-xl font-bold text-white">{fullName(user)}</h2>
                  {user.is_superuser && (
                    <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-florante-950">
                      Superuser
                    </span>
                  )}
                  {isSelf && (
                    <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      You
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-sm text-white/60">@{user.username}</p>
              </div>
            </div>
            <button onClick={onClose} className="rounded-lg p-1.5 text-white/70 hover:bg-white/10 hover:text-white">
              <IconClose size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-4 p-6 sm:p-8">
          {/* Status badge */}
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
              user.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700"
            }`}>
              <span className={`h-1.5 w-1.5 rounded-full ${user.is_active ? "bg-green-500" : "bg-red-500"}`} />
              {user.is_active ? "Active" : "Deactivated"}
            </span>
            {user.is_superuser && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-florante-100 px-3 py-1 text-xs font-bold text-florante-800">
                <IconShield size={12} /> Protected
              </span>
            )}
          </div>

          {/* Details */}
          <div className="divide-y divide-florante-100 rounded-2xl border border-florante-100 overflow-hidden text-sm">
            <div className="flex items-center gap-3 px-4 py-3">
              <IconMail size={15} className="shrink-0 text-florante-400" />
              <span className="text-gray-500">Email</span>
              <span className="ml-auto font-medium text-florante-900 truncate">{user.email}</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3">
              <IconClock size={15} className="shrink-0 text-florante-400" />
              <span className="text-gray-500">Joined</span>
              <span className="ml-auto font-medium text-florante-900">{formatDate(user.date_joined)}</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3">
              <IconClock size={15} className="shrink-0 text-florante-400" />
              <span className="text-gray-500">Last login</span>
              <span className="ml-auto font-medium text-florante-900">{formatDate(user.last_login)}</span>
            </div>
          </div>

          {/* Superuser/self protection note */}
          {protected_ && (
            <p className="rounded-xl bg-florante-50 px-4 py-3 text-xs text-florante-600 leading-relaxed">
              {user.is_superuser
                ? "⛨ Superuser accounts are fully protected and cannot be deactivated or deleted."
                : "You cannot modify your own account from this panel."}
            </p>
          )}

          {/* Actions */}
          {!protected_ && (
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => onToggleActive(user)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                  user.is_active
                    ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                    : "bg-green-100 text-green-800 hover:bg-green-200"
                }`}
              >
                {user.is_active ? "Deactivate" : "Reactivate"}
              </button>
              <button
                onClick={() => onDelete(user)}
                className="rounded-xl bg-red-100 px-4 py-2 text-xs font-semibold text-red-700 hover:bg-red-200 transition"
              >
                Delete Account
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── My Profile Panel ─────────────────────────────────────────────────────────
function MyProfilePanel({ me }: { me: StaffUser }) {
  return (
    <div className="rounded-[2rem] border border-florante-100 bg-white p-6 shadow-card sm:p-8">
      <div className="flex items-start gap-5">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent-grad font-heading text-3xl font-bold text-florante-950 shadow-glow">
          {(fullName(me)[0] || "?").toUpperCase()}
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-heading text-xl font-bold text-florante-900">{fullName(me)}</h2>
            {me.is_superuser && (
              <span className="rounded-full bg-florante-800 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
                Superuser
              </span>
            )}
          </div>
          <p className="mt-0.5 font-mono text-sm text-gray-500">@{me.username}</p>
          <p className="mt-1 text-sm text-gray-600">{me.email}</p>
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-400">
            <span>Joined {formatDate(me.date_joined)}</span>
            <span>·</span>
            <span>Last login {formatDate(me.last_login)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function AdminUsers() {
  const [users, setUsers] = useState<StaffUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [showFormGuide, setShowFormGuide] = useState(false);
  const [profileUser, setProfileUser] = useState<StaffUser | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  async function loadUsers() {
    setLoading(true);
    setError(null);
    try {
      const [usersRes, meRes] = await Promise.all([
        adminApi.get<StaffUser[]>("/users/"),
        adminApi.get<{ id: number }>("/me/"),
      ]);
      setUsers(usersRes.data);
      setCurrentUserId(meRes.data.id);
    } catch (err: unknown) {
      setError(
        (err as { response?: { data?: { detail?: string } } }).response?.data?.detail ||
          "Unable to load admin accounts."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadUsers(); }, []);

  const me = users.find((u) => u.id === currentUserId) ?? null;

  async function handleToggleActive(user: StaffUser) {
    const nextActive = !user.is_active;
    if (!window.confirm(`${nextActive ? "Reactivate" : "Deactivate"} admin '${user.username}'?`)) return;
    try {
      await adminApi.patch(`/users/${user.id}/`, { is_active: nextActive });
      setSuccessMsg(`Admin '${user.username}' ${nextActive ? "reactivated" : "deactivated"}.`);
      setProfileUser(null);
      await loadUsers();
    } catch (err: unknown) {
      window.alert(
        (err as { response?: { data?: { detail?: string } } }).response?.data?.detail ||
          "Unable to update user."
      );
    }
  }

  async function handleDeleteUser(user: StaffUser) {
    if (!window.confirm(`PERMANENT: Delete admin '${user.username}'? They will lose all access.`)) return;
    try {
      await adminApi.delete(`/users/${user.id}/`);
      setSuccessMsg(`Admin '${user.username}' has been deleted.`);
      setProfileUser(null);
      await loadUsers();
    } catch (err: unknown) {
      window.alert(
        (err as { response?: { data?: { detail?: string } } }).response?.data?.detail ||
          "Unable to delete user."
      );
    }
  }

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) { setFormError("Email and password are required."); return; }
    setSubmitting(true);
    setFormError(null);
    try {
      await adminApi.post("/users/", { name, email, password });
      setSuccessMsg(`Admin '${email}' registered successfully.`);
      setName(""); setEmail(""); setPassword("");
      setShowModal(false);
      await loadUsers();
    } catch (err: unknown) {
      setFormError(
        (err as { response?: { data?: { detail?: string } } }).response?.data?.detail ||
          "Could not register admin."
      );
    } finally { setSubmitting(false); }
  }

  const otherUsers = users.filter((u) => u.id !== currentUserId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-[2rem] bg-green-grad shadow-lift">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-70" style={{ backgroundSize: "40px 40px" }} />
        <div className="pointer-events-none absolute inset-0 bg-hero-mesh" />
        <div className="relative flex flex-wrap items-center justify-between gap-4 px-6 py-6 sm:px-8">
          <div>
            <span className="eyebrow-dark">Administration</span>
            <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white">Admin & Staff Accounts</h1>
            <p className="mt-1.5 text-sm text-white/60">
              Manage system administrators, view profiles, and control access. Superuser accounts are always protected.
            </p>
          </div>
          <button
            onClick={() => { setShowModal(true); setFormError(null); }}
            className="inline-flex items-center gap-2 rounded-full bg-accent-grad px-5 py-2.5 text-sm font-bold text-florante-950 shadow-glow transition hover:brightness-105"
          >
            + Register New Admin
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-800 shadow-soft">
          <div className="flex items-center gap-3"><IconCheck className="text-green-600" size={18} />{successMsg}</div>
          <button onClick={() => setSuccessMsg(null)} className="text-green-600 hover:text-green-900"><IconClose size={16} /></button>
        </div>
      )}

      {loading ? <Spinner label="Loading admin accounts..." /> : error ? (
        <ErrorState message={error} onRetry={loadUsers} />
      ) : (
        <>
          {/* My Profile */}
          {me && (
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-florante-500">My Profile</p>
              <MyProfilePanel me={me} />
            </div>
          )}

          {/* Other Admins */}
          {otherUsers.length > 0 && (
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-florante-500">All Administrators</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {otherUsers.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => setProfileUser(u)}
                    className={`text-left admin-corners relative flex flex-col justify-between rounded-2xl border p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift focus:outline-none ${
                      u.is_active ? "border-florante-100 bg-white" : "border-red-200 bg-red-50/40 opacity-80"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className={`flex h-10 w-10 items-center justify-center rounded-xl font-heading text-sm font-bold ${
                          u.is_superuser ? "bg-accent-grad text-florante-950" :
                          u.is_active ? "bg-florante-50 text-florante-700" : "bg-red-100 text-red-700"
                        }`}>
                          {(fullName(u)[0] || "?").toUpperCase()}
                        </span>
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                          u.is_superuser ? "bg-florante-900 text-accent" :
                          u.is_active ? "bg-accent/15 text-florante-900" : "bg-red-200 text-red-900"
                        }`}>
                          {u.is_superuser ? "Superuser" : u.is_active ? "Admin" : "Deactivated"}
                        </span>
                      </div>
                      <h3 className="mt-4 font-heading text-lg font-bold text-florante-900">{fullName(u)}</h3>
                      <p className="mt-0.5 font-mono text-xs text-gray-500">@{u.username}</p>
                      <p className="mt-2 truncate text-sm text-gray-600">{u.email}</p>
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-florante-100 pt-3 text-xs text-gray-400">
                      <span>Joined {formatDate(u.date_joined)}</span>
                      <span className="font-semibold text-florante-500">View profile →</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Profile Modal */}
      {profileUser && (
        <ProfileModal
          user={profileUser}
          isSelf={profileUser.id === currentUserId}
          onClose={() => setProfileUser(null)}
          onToggleActive={handleToggleActive}
          onDelete={handleDeleteUser}
        />
      )}

      {/* Register Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-florante-950/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-florante-100 bg-white shadow-2xl">
            <div className="relative overflow-hidden bg-green-grad px-6 py-5 sm:px-8">
              <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-60" style={{ backgroundSize: "36px 36px" }} />
              <div className="relative flex items-center justify-between">
                <h2 className="font-heading text-xl font-bold text-white">Register New Administrator</h2>
                <button onClick={() => setShowModal(false)} className="rounded-lg p-1.5 text-white/70 hover:bg-white/10 hover:text-white">
                  <IconClose size={20} />
                </button>
              </div>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4 p-6 sm:p-8">
              <div className="flex items-center justify-between gap-2 border-b border-florante-100 pb-3">
                <p className="text-xs font-semibold text-gray-500">Provide user credentials to register a new administrator account.</p>
                <button
                  type="button"
                  onClick={() => setShowFormGuide((prev) => !prev)}
                  className="inline-flex items-center gap-1 rounded-full border border-florante-200 bg-white px-2.5 py-1 text-xs font-semibold text-florante-700 hover:bg-florante-100"
                >
                  💡 {showFormGuide ? "Hide Guidance" : "Show Guidance"}
                </button>
              </div>

              {showFormGuide && (
                <div className="rounded-xl border border-florante-200 bg-florante-50/60 p-3.5 text-xs text-gray-700 space-y-1.5">
                  <p className="font-bold text-florante-900">💡 Admin Registration Field Guide:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><b>Full Name:</b> Used for audit log entries and profile displays across the control panel.</li>
                    <li><b>Email Address:</b> Used as the login ID to sign into /sanctum and for system notifications.</li>
                    <li><b>Password:</b> Strong password required. The new admin will be granted Staff access immediately.</li>
                  </ul>
                </div>
              )}

              {formError && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">{formError}</div>
              )}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-florante-800">Full Name</label>
                <div className="relative mt-1.5">
                  <IconUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-florante-400" size={16} />
                  <input
                    type="text" required placeholder="e.g. Jane Doe" value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-florante-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-florante-600 focus:ring-2 focus:ring-florante-600/15"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-florante-800">Email Address</label>
                <input
                  type="email" required placeholder="admin@florante.tech" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-florante-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-florante-600 focus:ring-2 focus:ring-florante-600/15"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-florante-800">Password</label>
                <input
                  type="password" required placeholder="••••••••••••" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-florante-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-florante-600 focus:ring-2 focus:ring-florante-600/15"
                />
              </div>
              <div className="flex items-center justify-end gap-3 border-t border-florante-100 pt-4">
                <button type="button" onClick={() => setShowModal(false)}
                  className="rounded-full border border-florante-200 px-5 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-full bg-accent-grad px-6 py-2 text-sm font-bold text-florante-950 shadow-glow transition hover:brightness-105 disabled:opacity-50">
                  {submitting ? "Registering..." : "Register Admin"}
                  <IconArrowRight size={14} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
