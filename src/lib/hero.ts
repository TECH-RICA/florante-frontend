const HERO_PATHS = ["/", "/solutions/:slug", "/products/:slug"];

export function isHeroPath(pathname: string): boolean {
  return HERO_PATHS.some((p) => {
    const segs = p.split("/");
    const loc = pathname.split("/");
    return (
      segs.length === loc.length &&
      segs.every((s, i) => s.startsWith(":") || s === loc[i])
    );
  });
}