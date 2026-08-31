import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 20, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
}

export function IconBolt(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M13 2 4.5 13.5H11L9.5 22 19 10h-6.5L13 2Z" />
    </svg>
  );
}

export function IconRefresh(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 11A8 8 0 1 0 18.4 16" />
      <path d="M20 5v6h-6" />
    </svg>
  );
}

export function IconShield(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" />
      <path d="M9.5 12l1.8 1.8 3.4-3.6" />
    </svg>
  );
}

export function IconCode(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 5l-3 14" />
    </svg>
  );
}

export function IconChart(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="M8 16v-5M12 16V8M16 16v-7" />
    </svg>
  );
}

export function IconLayers(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </svg>
  );
}

export function IconGear(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1.03-1.56V3a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.27.6.86 1.03 1.56 1.03H21a2 2 0 1 1 0 4h-.09A1.7 1.7 0 0 0 19.4 15Z" />
    </svg>
  );
}

export function IconSparkles(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
      <path d="M19 15l.9 2.6L22.5 18.5l-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9L19 15Z" />
      <path d="M5 16l.6 1.7L7.3 18.3l-1.7.6L5 20.6l-.6-1.7-1.7-.6 1.7-.6L5 16Z" />
    </svg>
  );
}

export function IconGlobe(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function IconUser(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20a8 8 0 0 1 16 0" />
    </svg>
  );
}

export function IconImage(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <circle cx="8.5" cy="9" r="1.6" />
      <path d="m4 17 4.5-4.5 3.5 3.5 3-3L20 17" />
    </svg>
  );
}

export function IconBook(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21V5.5Z" />
      <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" />
      <path d="M8.5 7h7" />
    </svg>
  );
}

export function IconCloud(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 18a4.5 4.5 0 1 1 .9-8.9A6 6 0 0 1 19.5 10 3.5 3.5 0 0 1 19 17H7Z" />
      <path d="M12 11v6M9.5 14.5 12 17l2.5-2.5" />
    </svg>
  );
}

export function IconSmartphone(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 18h3" />
    </svg>
  );
}

export function IconArrowUpRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 4h4l1.5 4.5-2.3 1.6a12.5 12.5 0 0 0 5.7 5.7l1.6-2.3L20 15v4a1.5 1.5 0 0 1-1.7 1.5C10.3 19.6 4.4 13.7 3.5 5.7A1.5 1.5 0 0 1 5 4Z" />
    </svg>
  );
}

export function IconPin(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function IconWhatsApp(props: IconProps) {
  return (
    <svg width={props.size ?? 20} height={props.size ?? 20} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.1 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.05 2a9.9 9.9 0 0 0-8.5 15L2 22l5.1-1.5A9.9 9.9 0 1 0 12.05 2Zm0 18.1c-1.6 0-3.16-.42-4.52-1.22l-.32-.19-3.03.9.9-2.95-.21-.33a8.2 8.2 0 1 1 7.18 3.79Z" />
    </svg>
  );
}

export function IconLinkedIn(props: IconProps) {
  return (
    <svg width={props.size ?? 20} height={props.size ?? 20} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M6.94 8.5v11H3.56v-11h3.38Zm-.05-3.75c0 .94-.7 1.68-1.75 1.68-.98 0-1.66-.74-1.66-1.68C3.48 3.7 4.17 3 5.13 3c.98 0 1.76.7 1.76 1.75ZM9.5 19.5h3.38v-6.17c0-.33.02-.66.12-.9.27-.66.88-1.35 1.9-1.35 1.34 0 1.88 1.02 1.88 2.52v5.9h3.38v-6.33c0-3.4-1.81-4.98-4.23-4.98-1.95 0-2.82 1.07-3.31 1.83h-.02V8.5H9.5v11Z" />
    </svg>
  );
}

export function IconTwitter(props: IconProps) {
  return (
    <svg width={props.size ?? 20} height={props.size ?? 20} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.9 2h3.2l-7 8 8.2 10.9h-6.4l-5-6.6-5.8 6.6H2.9l7.5-8.6L2.6 2H9l4.5 6 5.4-6Zm-1.1 17h1.8L7.7 3.8H5.8l12 15.2Z" />
    </svg>
  );
}

export function IconGitHub(props: IconProps) {
  return (
    <svg width={props.size ?? 20} height={props.size ?? 20} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.9-1.3 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function IconChevronRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function IconEye(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function IconQuote(props: IconProps) {
  return (
    <svg width={props.size ?? 32} height={props.size ?? 32} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M10.6 5.2C6.5 7 4 10.3 4 14.7c0 2.7 1.6 4.5 3.9 4.5 2 0 3.5-1.5 3.5-3.5s-1.5-3.4-3.4-3.4c-.4 0-.8 0-.9.1.3-2.3 2-4.4 4.3-5.7l-0.8-1.5Zm8 0c-4.1 1.8-6.6 5.1-6.6 9.5 0 2.7 1.6 4.5 3.9 4.5 2 0 3.5-1.5 3.5-3.5s-1.5-3.4-3.4-3.4c-.4 0-.8 0-.9.1.3-2.3 2-4.4 4.3-5.7l-.8-1.5Z" />
    </svg>
  );
}

export function IconDownload(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
    </svg>
  );
}

export function IconLock(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2.5" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5M12 14.5v2" />
    </svg>
  );
}

export function IconRocket(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 15c-1 1.5-1.5 4-1.5 5.5C5 20 7.5 19.5 9 18.5" />
      <path d="M14.5 4.5C16.5 2.5 20 3 20 3s.5 3.5-1.5 5.5c-2.5 2.6-5.5 3.5-7.8 3.5H9l-2.5 2.5L7 12C7 9.7 8 6.7 14.5 4.5Z" />
      <circle cx="15.5" cy="8.5" r="1.6" />
    </svg>
  );
}

export function IconLogout(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}

export function IconEyeOff(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M2 12s3.5-7 10-7c2.2 0 4.1.7 5.7 1.6M6.1 5.4C8 4.4 10 4 12 4c6.5 0 10 7 10 7a17 17 0 0 1-3.6 4.6M9.9 18.6A9.8 9.8 0 0 0 12 19c6.5 0 10-7 10-7" />
      <path d="M4 4l16 16" />
    </svg>
  );
}

export function IconClock(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function IconUsers(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c.8-3.2 3.4-5 6.5-5s5.7 1.8 6.5 5" />
      <path d="M16 5.5a3.5 3.5 0 0 1 0 6.8M17.5 15.4c1.8.8 3 2.3 3.6 4.6" />
    </svg>
  );
}

export function IconActivity(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 12h4l3-8 4 16 3-8h4" />
    </svg>
  );
}

export function IconFlame(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3c1 3.5-2.5 5-2.5 8A3.5 3.5 0 0 0 13 14.5c.9 0 1.6-.5 2-1.2-.3 2-1.8 3.2-3.5 3.2A3.7 3.7 0 0 1 8 12.6C7.5 14.5 8 17 10 18.6c2.1 1.7 5.2 1.4 7-0.6a5.4 5.4 0 0 0 1-5.4C17 9.5 14.5 8 14 5 13.5 3.8 12.8 3 12 3Z" />
    </svg>
  );
}

export function IconMousePointer(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m4 4 6.5 16 2-6.5 6.5-2L4 4Z" />
    </svg>
  );
}

export function IconMore(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="5.5" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="12" cy="18.5" r="1.6" />
    </svg>
  );
}

export function IconTrash(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 7h16" />
      <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      <path d="M6 7l1 13a1 1 0 0 0 1 .9h8a1 1 0 0 0 1-.9l1-13" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

export function IconArchive(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="4" width="18" height="5" rx="1.5" />
      <path d="M5 9v9a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 18V9" />
      <path d="M10 13h4" />
    </svg>
  );
}

export function IconSend(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m21 3-9.5 9.5" />
      <path d="M21 3 13.5 21l-2.5-7.5L3 11 21 3Z" />
    </svg>
  );
}

export function IconInbox(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 4h18v16H3z" />
      <path d="m3 13 5-3 4 3 4-3 5 3" />
      <path d="M3 4h18v16H3z" />
    </svg>
  );
}

export function IconMailReply(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M21 8l-9 6-9-6" />
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m7 16 4 4 4-4" />
    </svg>
  );
}

export function IconBuilding(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 21h18M5 21V7l7-4 7 4v14" />
      <path d="M9 21v-5h6v5" />
      <path d="M9 10h.01M15 10h.01M9 14h.01M15 14h.01" />
    </svg>
  );
}

export function IconGradCap(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="M12 13v8" />
      <path d="M6 9.5v5.8C7.7 16.8 9.7 17.5 12 17.5c2.3 0 4.3-.7 6-1.2V9.5" />
    </svg>
  );
}

export function IconFlask(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9 3h6M9 3v8l-5 9h16l-5-9V3" />
      <path d="M7 16h10" />
    </svg>
  );
}

export function IconBriefcase(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="2" y="7" width="20" height="14" rx="2.5" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M12 12v2M2 13h20" />
    </svg>
  );
}

export function IconStar(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 18l-6.2 3.1 1.2-6.9-5-4.9 6.9-1L12 2Z" />
    </svg>
  );
}

export function IconTarget(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
      <path d="M21 12h-3M6 12H3M12 3v3M12 21v-3" />
    </svg>
  );
}

export function IconTrendingUp(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 17l5-5 4 4 8-8" />
      <path d="M16 8h5v5" />
    </svg>
  );
}

export function IconAward(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="8.5" r="5.5" />
      <path d="m8.5 14 1.5 7 2-3.5 2 3.5 1.5-7" />
    </svg>
  );
}

export function IconMapPin(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function IconExternalLink(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="m10 14 11-11" />
    </svg>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function IconHeartHandshake(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M19 14c1.5-1 3-2.5 3-4.5a4.5 4.5 0 0 0-4.5-4.5c-1.5 0-3 .5-4.5 2-1.5-1.5-3-2-4.5-2A4.5 4.5 0 0 0 4 9.5C4 11.5 5.5 13 7 14l5 5 5-5Z" />
    </svg>
  );
}

export function IconLightbulb(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9 21h6" />
      <path d="M12 3a6 6 0 0 1 6 6c0 2.5-1.5 4.5-3 6H9c-1.5-1.5-3-3.5-3-6a6 6 0 0 1 6-6Z" />
      <path d="M9.5 17H14.5" />
    </svg>
  );
}

export function IconGrid(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export function IconList(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  );
}
