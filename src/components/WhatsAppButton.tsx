import WhatsAppIcon from "./icons/WhatsAppIcon";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "../lib/whatsapp";

type Variant = "primary" | "secondary" | "outline" | "outline-light" | "ghost";

interface WhatsAppButtonProps {
  message?: string;
  label?: string;
  variant?: Variant;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function WhatsAppButton({
  message = WHATSAPP_MESSAGES.contract,
  label = "Contratar pelo WhatsApp",
  variant = "primary",
  className = "",
  size = "md",
}: WhatsAppButtonProps) {
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn--${variant} btn--${size} ${className}`}
    >
      <WhatsAppIcon size={20} />
      <span>{label}</span>
    </a>
  );
}
