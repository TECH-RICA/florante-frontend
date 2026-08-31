export interface AdminUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_superuser: boolean;
}

export interface RecentLead {
  id: number;
  name: string;
  category: string;
  email: string;
  phone: string;
  organization: string;
  industry: string;
  need: string;
  budget_range: string;
  message: string;
  status: string;
  source: string;
  is_read: boolean;
  is_archived: boolean;
  lead_score: number;
  telegram_chat_id: string;
  telegram_username: string;
  created_at: string;
}

export interface SenderSummary {
  email: string;
  name: string;
  count: number;
  last: string;
}

export interface AuditEntry {
  id: number;
  actor: number | null;
  actor_name: string;
  actor_email: string;
  action: string;
  resource: string;
  resource_id: number | null;
  summary: string;
  meta: Record<string, unknown>;
  created_at: string;
}

export interface Visit {
  id: number;
  path: string;
  referrer: string;
  device: string;
  is_authenticated: boolean;
  viewed_at: string;
}

export interface PageTime {
  path: string;
  sessions: number;
  total_seconds: number;
  avg_seconds: number;
}

export interface SectionTime {
  section: string;
  views: number;
  total_seconds: number;
}

export interface ActivityItem {
  id: number;
  action: string;
  label: string;
  path: string;
  meta: Record<string, unknown>;
  created_at: string;
}

export interface ActiveNow {
  path: string;
  active: number;
}

export interface DashboardStats {
  counts: Record<string, number>;
  visits: {
    total_30d: number;
    unique_sessions_30d: number;
    today: number;
    last_7d: number;
    by_day: { date: string; count: number }[];
    top_pages: { path: string; count: number }[];
    devices: Record<string, number>;
  };
  engagement: {
    pages_time: PageTime[];
    sections_by_page: Record<string, SectionTime[]>;
    recent_activity: ActivityItem[];
    active_now: ActiveNow[];
  };
  recent_leads: RecentLead[];
  recent_visits: Visit[];
  lead_statuses: Record<string, number>;
}

export interface OptionItem {
  id: number;
  [key: string]: unknown;
}
