import { type ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}

export default function PageContainer({
  children,
  className = "",
  narrow = false,
}: PageContainerProps) {
  return (
    <div
      className={`page-container ${narrow ? "page-container--narrow" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
