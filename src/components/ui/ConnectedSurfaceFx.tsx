function ConnectedFloatingLayer() {
  return (
    <div className="connected-floating-layer" aria-hidden="true">
      <span className="connected-float connected-float--wifi connected-float--a">
        <svg viewBox="0 0 64 64" fill="none">
          <path
            d="M16 28c8.8-8.8 23.2-8.8 32 0"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M22 35c5.5-5.5 14.5-5.5 20 0"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M28 42c2.2-2.2 5.8-2.2 8 0"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="32" cy="48" r="2.4" fill="currentColor" />
        </svg>
      </span>

      <span className="connected-float connected-float--nodes connected-float--b">
        <svg viewBox="0 0 80 56" fill="none">
          <path
            d="M12 40 L28 18 L52 28 L68 12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="40" r="3.2" fill="currentColor" />
          <circle cx="28" cy="18" r="3.6" fill="currentColor" />
          <circle cx="52" cy="28" r="3" fill="currentColor" />
          <circle cx="68" cy="12" r="2.6" fill="currentColor" />
        </svg>
      </span>

      <span className="connected-float connected-float--ring connected-float--c" />
      <span className="connected-float connected-float--ring-sm connected-float--a connected-float--mobile-hide" />

      <span className="connected-float connected-float--sparkles connected-float--b">
        <i className="connected-float__plus" />
        <i className="connected-float__dot connected-float__dot--1" />
        <i className="connected-float__dot connected-float__dot--2" />
        <i className="connected-float__dot connected-float__dot--3" />
      </span>

      <span className="connected-float connected-float--wave connected-float--c connected-float--mobile-hide">
        <svg viewBox="0 0 120 40" fill="none">
          <path
            d="M4 28 C24 8, 44 8, 64 28 S104 48, 116 20"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </span>

      <span className="connected-float connected-float--diamond connected-float--a" />
      <span className="connected-float connected-float--square connected-float--b connected-float--mobile-hide" />

      <span className="connected-float connected-float--corner-tr connected-float--spin">
        <svg viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="48" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="60" cy="60" r="34" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="60" cy="60" r="20" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="60" cy="60" r="6" fill="currentColor" opacity="0.55" />
        </svg>
      </span>

      <span className="connected-float connected-float--corner-bl connected-float--c">
        <svg viewBox="0 0 100 80" fill="none">
          <path
            d="M10 70 V40 H40 V18 H70"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
          <circle cx="10" cy="70" r="3" fill="currentColor" />
          <circle cx="40" cy="40" r="3" fill="currentColor" />
          <circle cx="40" cy="18" r="2.5" fill="currentColor" />
          <circle cx="70" cy="18" r="3.2" fill="currentColor" />
          <path
            d="M70 18 L88 30 M70 18 L88 8"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </div>
  );
}

export default function ConnectedSurfaceFx() {
  return (
    <div className="use-cases__fx" aria-hidden="true">
      <span className="use-cases__blob use-cases__blob--1" />
      <span className="use-cases__blob use-cases__blob--2" />
      <span className="use-cases__blob use-cases__blob--3" />
      <span className="use-cases__mouse-glow" />
      <ConnectedFloatingLayer />
    </div>
  );
}
