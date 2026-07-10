import type { ReactNode } from "react";

interface BenefitIconProps {
  className?: string;
}

function IconShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <svg
      width="24"
      height="24"
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

export function MapPinIcon({ className }: BenefitIconProps) {
  return (
    <IconShell className={className}>
      <path
        d="M12 21s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.75" />
    </IconShell>
  );
}

export function WifiIcon({ className }: BenefitIconProps) {
  return (
    <IconShell className={className}>
      <path
        d="M5 12.55a11 11 0 0 1 14.08 0"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.53 16.11a6 6 0 0 1 6.95 0"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 20h.01"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </IconShell>
  );
}

export function MessageCircleIcon({ className }: BenefitIconProps) {
  return (
    <IconShell className={className}>
      <path
        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconShell>
  );
}

export function PlusCircleIcon({ className }: BenefitIconProps) {
  return (
    <IconShell className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 8v8M8 12h8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </IconShell>
  );
}

export function CalendarCheckIcon({ className }: BenefitIconProps) {
  return (
    <IconShell className={className}>
      <path
        d="M8 2v4M16 2v4M3.5 9h17"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 5h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m9 14 2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconShell>
  );
}
