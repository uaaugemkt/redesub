import fs from "fs";
import path from "path";

const dir = "public/media/placeholders";
const items = [
  ["hero-family", "Familia no hero"],
  ["family-connected", "Familia conectada"],
  ["home-office", "Home office"],
  ["gaming-streaming", "Gaming e streaming"],
  ["technician", "Tecnico RedeSub"],
  ["customer-support", "Atendimento"],
  ["small-business", "Pequeno negocio"],
  ["team-institutional", "Equipe institucional"],
];

function svg(label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" role="img"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#012840"/><stop offset="55%" stop-color="#034e7a"/><stop offset="100%" stop-color="#03a1fd" stop-opacity=".35"/></linearGradient></defs><rect width="800" height="1000" fill="url(#g)"/><ellipse cx="400" cy="920" rx="220" ry="28" fill="#010101" opacity=".15"/><circle cx="400" cy="320" r="72" fill="#f9fafa" opacity=".92"/><path d="M250 620 Q400 480 550 620 L550 820 L250 820 Z" fill="#f9fafa" opacity=".88"/><rect x="48" y="48" width="704" height="904" rx="24" fill="none" stroke="#f9fafa" stroke-opacity=".2" stroke-width="2" stroke-dasharray="8 8"/><text x="400" y="960" text-anchor="middle" fill="#f9fafa" font-family="Plus Jakarta Sans,Arial,sans-serif" font-size="18" opacity=".75">Placeholder: ${label}</text><text x="400" y="88" text-anchor="middle" fill="#ff8505" font-family="Plus Jakarta Sans,Arial,sans-serif" font-size="14" font-weight="600">SUBSTITUIR POR FOTO OFICIAL</text></svg>`;
}

fs.mkdirSync(dir, { recursive: true });
for (const [name, label] of items) {
  fs.writeFileSync(path.join(dir, `${name}.svg`), svg(label));
}
