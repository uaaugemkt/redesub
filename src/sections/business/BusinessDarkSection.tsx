import type { ReactNode } from "react";
import { WifiIcon } from "../../components/icons/BenefitIcons";
import {
  GaugeIcon,
  HeadphonesIcon,
  SlidersIcon,
} from "../../components/icons/BusinessImpactIcons";
import Reveal from "../../components/ui/Reveal";

const DARK_POINTS: ReadonlyArray<{
  id: string;
  title: string;
  text: string;
  icon: ReactNode;
}> = [
  {
    id: "velocidade",
    title: "Alta velocidade",
    text: "Mais performance para seu negócio.",
    icon: <GaugeIcon />,
  },
  {
    id: "estabilidade",
    title: "Estabilidade",
    text: "Conexão confiável para a rotina da empresa.",
    icon: <WifiIcon />,
  },
  {
    id: "suporte",
    title: "Suporte especializado",
    text: "Atendimento rápido e eficiente.",
    icon: <HeadphonesIcon />,
  },
  {
    id: "sob-medida",
    title: "Soluções sob medida",
    text: "Soluções para diferentes portes de empresa.",
    icon: <SlidersIcon />,
  },
];

const OFFICE_PHOTO = "/media/beneficios/Trabalhar-sem-interrupcoes.png";

export default function BusinessDarkSection() {
  return (
    <section className="biz-dark section" aria-labelledby="business-dark-title">
      <div className="biz-dark__fx" aria-hidden="true">
        <span className="biz-dark__grid" />
        <span className="biz-dark__glow biz-dark__glow--orange" />
        <span className="biz-dark__glow biz-dark__glow--navy" />
        <span className="biz-dark__dots" />
      </div>

      <div className="container biz-dark__inner">
        <Reveal className="biz-dark__copy">
          <span className="biz-dark__eyebrow">Operação conectada</span>
          <h2 className="biz-dark__title" id="business-dark-title">
            Internet para acompanhar a operação do seu negócio
          </h2>
          <p className="biz-dark__desc">
            Conectividade para trabalhar, atender clientes e manter sua empresa
            conectada no dia a dia.
          </p>

          <div className="biz-dark__points">
            {DARK_POINTS.map((item) => (
              <article key={item.id} className="biz-dark__point">
                <span className="biz-dark__point-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal className="biz-dark__media" delay={90}>
          <div className="biz-dark__frame">
            <img
              src={OFFICE_PHOTO}
              alt="Equipe conectada no dia a dia da empresa"
              className="biz-dark__image"
              width={880}
              height={720}
              loading="lazy"
              decoding="async"
            />
            <div className="biz-dark__frame-overlay" aria-hidden="true" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
