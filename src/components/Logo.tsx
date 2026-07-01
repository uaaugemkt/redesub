import { LOGO_SRC } from "../lib/constants";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <img
      src={LOGO_SRC}
      alt="RedeSub Internet de Fibra"
      className={`logo-img ${className}`.trim()}
      width={135}
      height={48}
    />
  );
}
