import { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home }          from "./pages/Home";
import { Solutions }     from "./pages/Solutions";
import { SolutionDetail }from "./pages/SolutionDetail";
import { Products }      from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { Insights }      from "./pages/Insights";
import { ArticleDetail } from "./pages/ArticleDetail";
import { Contact }       from "./pages/Contact";
import { About }         from "./pages/About";
import { Industries }    from "./pages/Industries";
import { IndustryDetail }from "./pages/IndustryDetail";
import { Labs }          from "./pages/Labs";
import { Careers }       from "./pages/Careers";
import { Partners }      from "./pages/Partners";
import { usePageTracking } from "./hooks/usePageTracking";
import { ToastProvider }   from "./components/Toast";
import { TalkModalProvider } from "./hooks/useTalkModal";
import { SearchModalProvider } from "./hooks/useSearchModal";
import { TalkModal }         from "./components/TalkModal";
import { AdminLogin }    from "./pages/admin/AdminLogin";
import { AdminLayout }   from "./pages/admin/AdminLayout";
import { AdminDashboard }from "./pages/admin/AdminDashboard";
import { AdminAnalytics }from "./pages/admin/AdminAnalytics";
import { AdminResource } from "./pages/admin/AdminResource";
import { AdminMessages } from "./pages/admin/AdminMessages";
import { AdminAudit }    from "./pages/admin/AdminAudit";
import { SiteSettings }  from "./pages/admin/SiteSettings";
import { AdminUsers }     from "./pages/admin/AdminUsers";
import { AdminHelp }     from "./pages/admin/AdminHelp";
import { ADMIN_LOGIN, ADMIN_PANEL, ADMIN_DASHBOARD } from "./lib/adminPaths";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center overflow-hidden bg-moss/60 py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-60" style={{ backgroundSize: "48px 48px" }} />
      <div className="pointer-events-none absolute -left-40 top-10 h-[28rem] w-[28rem] animate-blob rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 animate-blob rounded-full bg-florante-400/15 blur-3xl [animation-delay:4s]" />
      <div className="container-page relative text-center">
        <p className="font-heading text-[10rem] font-bold leading-none text-florante-900/[0.06]">404</p>
        <h1 className="mt-2 font-heading text-3xl font-bold text-florante-800">Page not found</h1>
        <p className="mx-auto mt-3 max-w-sm text-gray-600">The page you're looking for doesn't exist or has moved.</p>
        <a href="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-florante-700 px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:bg-florante-800 hover:shadow-glow">
          Back home
        </a>
      </div>
    </div>
  );
}

function AdminNotFound() {
  return (
    <div className="relative flex min-h-screen items-center overflow-hidden bg-green-grad py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-70" style={{ backgroundSize: "48px 48px" }} />
      <div className="pointer-events-none absolute inset-0 bg-hero-mesh" />
      <div className="container-page relative text-center">
        <p className="font-heading text-[10rem] font-bold leading-none text-white/[0.06]">404</p>
        <h1 className="mt-2 font-heading text-3xl font-bold text-white">Page not found</h1>
        <p className="mx-auto mt-3 max-w-sm text-white/70">This admin page doesn't exist.</p>
        <a href={ADMIN_DASHBOARD} className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white shadow-soft backdrop-blur transition-all hover:bg-white/25">
          Back to dashboard
        </a>
      </div>
    </div>
  );
}

export default function App() {
  usePageTracking();
  return (
    <TalkModalProvider>
      <SearchModalProvider>
        <ToastProvider>
          <ScrollToTop />
          <TalkModal />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/"                       element={<Home />} />
              <Route path="/solutions"              element={<Solutions />} />
              <Route path="/solutions/:slug"        element={<SolutionDetail />} />
              <Route path="/products"               element={<Products />} />
              <Route path="/products/:slug"         element={<ProductDetail />} />
              <Route path="/insights"               element={<Insights />} />
              <Route path="/insights/:slug"         element={<ArticleDetail />} />
              <Route path="/contact"                element={<Contact />} />
              <Route path="/about"                  element={<About />} />
              <Route path="/industries"             element={<Industries />} />
              <Route path="/industries/:slug"       element={<IndustryDetail />} />
              <Route path="/labs"                   element={<Labs />} />
              <Route path="/careers"                element={<Careers />} />
              <Route path="/partners"               element={<Partners />} />
            </Route>
            <Route path={ADMIN_LOGIN}    element={<AdminLogin />} />
            <Route path={ADMIN_PANEL}    element={<AdminLayout />}>
              <Route index element={<Navigate to={ADMIN_DASHBOARD} replace />} />
              <Route path="dashboard"  element={<AdminDashboard />} />
              <Route path="analytics"  element={<AdminAnalytics />} />
              <Route path="site"       element={<SiteSettings />} />
              <Route path="users"      element={<AdminUsers />} />
              <Route path="help"       element={<AdminHelp />} />
              <Route path="leads"      element={<AdminMessages />} />
              <Route path="audit"      element={<AdminAudit />} />
              <Route path=":resource"  element={<AdminResource />} />
              <Route path="*"          element={<AdminNotFound />} />
            </Route>
            <Route path="*"              element={<NotFound />} />
          </Routes>
        </ToastProvider>
      </SearchModalProvider>
    </TalkModalProvider>
  );
}