import type { ReactNode } from "react";

interface IconProps {
  className?: string;
}

function IconShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function GaugeIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path
        d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M12 3v2M5.6 5.6l1.4 1.4M3 12h2M5.6 18.4l1.4-1.4M12 19v2M18.4 18.4l-1.4-1.4M19 12h2M18.4 5.6l-1.4 1.4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </IconShell>
  );
}

export function VideoIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <rect x="3" y="6" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="m17 10 4-2v8l-4-2v-4Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </IconShell>
  );
}

export function HeadphonesIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path
        d="M4 14v-2a8 8 0 0 1 16 0v2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <rect x="2" y="14" width="5" height="6" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <rect x="17" y="14" width="5" height="6" rx="2" stroke="currentColor" strokeWidth="1.75" />
    </IconShell>
  );
}

export function ShoppingCartIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <circle cx="9" cy="20" r="1.5" fill="currentColor" />
      <circle cx="18" cy="20" r="1.5" fill="currentColor" />
      <path
        d="M2 3h2l2.2 11.4a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 7H6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconShell>
  );
}

export function RouterIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <rect x="4" y="14" width="16" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M8 14V9a4 4 0 0 1 8 0v5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="12" cy="9" r="1.5" fill="currentColor" />
    </IconShell>
  );
}

export function CircleHelpIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M9.5 9.5a2.5 2.5 0 0 1 4.2 1.8c0 1.7-2.7 1.7-2.7 3.2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="12" cy="17" r="0.75" fill="currentColor" />
    </IconShell>
  );
}
