import "../styles/careers-page.css";
import InternalPageHero from "../components/layout/InternalPageHero";
import Reveal from "../components/ui/Reveal";
import JobApplicationForm from "../components/careers/JobApplicationForm";
import { MapPinIcon } from "../components/icons/BenefitIcons";
import { PAGE_META } from "../config/site";
import { usePageMeta } from "../hooks/usePageMeta";

const DIFFERENTIALS = [
  { icon: "growth" as const, text: "Ambiente de desenvolvimento e aprendizado" },
  { icon: "grid" as const, text: "Oportunidades em diferentes áreas" },
  { icon: "pin" as const, text: "Empresa conectada com a região e com as pessoas" },
];

export default function CareersPage() {
  usePageMeta(PAGE_META.trabalheConosco);

  return (
    <div className="careers-page">
      <InternalPageHero
        eyebrow="Faça parte do nosso time"
        title="Construa sua carreira com a RedeSub"
        breadcrumbs={[{ label: "Início", path: "/" }, { label: "Trabalhe conosco" }]}
      />

      <section className="section section--muted careers-support">
        <div className="container container--narrow">
          <Reveal>
            <h2 className="section__title">Seu próximo desafio pode começar aqui</h2>
            <p className="section__desc">
              Cadastre seu currículo em nosso banco de talentos. Quando surgir
              uma oportunidade compatível com o seu perfil, nossa equipe
              poderá entrar em contato.
            </p>
          </Reveal>

          <Reveal delay={70}>
            <ul className="careers-differentials">
              {DIFFERENTIALS.map((item) => (
                <li key={item.text} className="careers-differentials__item">
                  <span className="careers-differentials__icon" aria-hidden="true">
                    <DifferentialIcon type={item.icon} />
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section careers-apply" id="enviar-curriculo">
        <div className="container container--narrow">
          <Reveal>
            <JobApplicationForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function DifferentialIcon({ type }: { type: "growth" | "grid" | "pin" }) {
  if (type === "pin") return <MapPinIcon />;

  if (type === "grid") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    );
  }

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 19V9M10 19v-6M16 19V6M4 9l6-4 6 3 4-3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
