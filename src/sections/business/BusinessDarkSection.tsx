import type { ReactNode } from "react";
import { WifiIcon } from "../../components/icons/BenefitIcons";
import {
  GaugeIcon,
  HeadphonesIcon,
  SlidersIcon,
} from "../../components/icons/BusinessImpactIcons";
import Reveal from "../../components/ui/Reveal";

const OPERATION_CARDS: ReadonlyArray<{
  id: string;
  title: string;
  text: string;
  icon: ReactNode;
}> = [
  {
    id: "velocidade",
    title: "Alta velocidade",
    text: "Desempenho para sistemas, arquivos e atividades online.",
    icon: <GaugeIcon />,
  },
  {
    id: "estabilidade",
    title: "Estabilidade",
    text: "Conexão confiável durante toda a operação.",
    icon: <WifiIcon />,
  },
  {
    id: "suporte",
    title: "Suporte especializado",
    text: "Atendimento preparado para demandas empresariais.",
    icon: <HeadphonesIcon />,
  },
  {
    id: "sob-medida",
    title: "Soluções sob medida",
    text: "Opções para diferentes estruturas e necessidades.",
    icon: <SlidersIcon />,
  },
];

export default function BusinessDarkSection() {
  return (
    <section className="biz-dark section" aria-labelledby="business-dark-title">
      <div className="biz-dark__fx" aria-hidden="true">
        <span className="biz-dark__dots" />
      </div>

      <div className="container biz-dark__inner">
        <Reveal>
          <header className="biz-dark__header">
            <span className="biz-dark__eyebrow">Operação conectada</span>
            <h2 className="biz-dark__title" id="business-dark-title">
              Estabilidade para manter sua operação em movimento
            </h2>
            <p className="biz-dark__desc">
              Velocidade, estabilidade e suporte para as atividades que fazem
              parte da rotina da sua empresa.
            </p>
          </header>
        </Reveal>

        <div className="biz-dark__cards">
          {OPERATION_CARDS.map((item, index) => (
            <Reveal key={item.id} delay={index * 55}>
              <article className="biz-dark__card">
                <span className="biz-dark__card-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <h3 className="biz-dark__card-title">{item.title}</h3>
                <p className="biz-dark__card-text">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
