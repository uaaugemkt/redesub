import Reveal from "../components/ui/Reveal";

const PROOFS = [
  { label: "Atendimento local", detail: "Equipe que conhece a região" },
  { label: "Fibra óptica", detail: "Conexão estável para o dia a dia" },
  { label: "Suporte próximo", detail: "Fale com a gente pelo WhatsApp" },
  { label: "Instalação sob consulta", detail: "Confirme disponibilidade no seu endereço" },
] as const;

export default function TrustProofSection() {
  return (
    <section className="trust-proof section--muted" aria-label="Diferenciais RedeSub">
      <div className="container">
        <ul className="trust-proof__grid">
          {PROOFS.map((item, index) => (
            <li key={item.label}>
              <Reveal delay={index * 60}>
                <div className="trust-proof__item">
                  <strong>{item.label}</strong>
                  <span>{item.detail}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
