import { Children, type ReactNode } from "react";
import Reveal from "./Reveal";

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  staggerMs?: number;
}

export default function StaggerGroup({
  children,
  className = "",
  staggerMs = 80,
}: StaggerGroupProps) {
  const items = Children.toArray(children);

  return (
    <div className={className}>
      {items.map((child, index) => (
        <Reveal key={index} delay={index * staggerMs}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
