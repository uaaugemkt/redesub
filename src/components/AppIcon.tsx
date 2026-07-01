import { isNoneApp, type AppOption } from "../config/apps";

type AppIconSize = "xs" | "sm" | "md" | "lg";

interface AppIconProps {
  app: AppOption;
  size?: AppIconSize;
  className?: string;
}

export default function AppIcon({ app, size = "md", className = "" }: AppIconProps) {
  if (isNoneApp(app.id)) {
    return (
      <span
        className={`app-icon app-icon--none app-icon--${size} ${className}`.trim()}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
    );
  }

  if (app.icon) {
    return (
      <img
        src={app.icon}
        alt={app.alt}
        className={`app-icon app-icon--img app-icon--${size} ${className}`.trim()}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <span
      className={`app-icon app-icon--fallback app-icon--${size} ${className}`.trim()}
      aria-hidden="true"
      title={app.name}
    >
      <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
        <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 10h6M9 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}
