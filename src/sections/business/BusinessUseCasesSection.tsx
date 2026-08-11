import type { ReactNode } from "react";
import { MapPinIcon } from "../../components/icons/BenefitIcons";
import {
  GaugeIcon,
  RouterIcon,
  ShoppingCartIcon,
  VideoIcon,
} from "../../components/icons/BusinessImpactIcons";
import Reveal from "../../components/ui/Reveal";

const SEGMENTS: ReadonlyArray<{
  id: string;
  title: string;
  text: string;
  icon: ReactNode;
  size: "sm" | "lg";
}> = [
  {
    id: "pequenas",
    title: "Pequenas empresas",
    text: "Conectividade para operações enxutas e rotina digital no dia a dia.",
    icon: <RouterIcon />,
    size: "sm",
  },
  {
    id: "grandes",
    title: "Grandes empresas",
    text: "Performance e estabilidade para equipes e processos com maior demanda.",
    icon: <GaugeIcon />,
    size: "sm",
  },
  {
    id: "comercios",
    title: "Comércios",
    text: "Internet para atendimento, sistemas e operação comercial contínua.",
    icon: <ShoppingCartIcon />,
    size: "sm",
  },
  {
    id: "restaurantes",
    title: "Restaurantes",
    text: "Conexão para pedidos, pagamentos e o ritmo do salão.",
    icon: <MapPinIcon />,
    size: "lg",
  },
  {
    id: "escritorios",
    title: "Escritórios e serviços",
    text: "Estabilidade para videoconferências, arquivos e sistemas de trabalho.",
    icon: <VideoIcon />,
    size: "lg",
  },
];

export default function BusinessUseCasesSection() {
  const top = SEGMENTS.filter((item) => item.size === "sm");
  const bottom = SEGMENTS.filter((item) => item.size === "lg");

  return (
    <section
      className="biz-segments section"
      aria-labelledby="business-usecases-title"
    >
      <div className="container">
        <Reveal>
          <header className="biz-segments__header">
            <span className="eyebrow">Segmentos</span>
            <h2 className="biz-segments__title" id="business-usecases-title">
              Conectividade para diferentes negócios
            </h2>
            <p className="biz-segments__desc">
              Soluções para operações de diferentes portes e segmentos.
            </p>
          </header>
        </Reveal>

        <div className="biz-segments__top">
          {top.map((item, index) => (
            <Reveal key={item.id} delay={index * 55}>
              <article className={`biz-seg biz-seg--${item.id}`}>
                <div className="biz-seg__art" aria-hidden="true">
                  <span className="biz-seg__icon">{item.icon}</span>
                  <span className="biz-seg__shape biz-seg__shape--a" />
                  <span className="biz-seg__shape biz-seg__shape--b" />
                </div>
                <div className="biz-seg__body">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="biz-segments__bottom">
          {bottom.map((item, index) => (
            <Reveal key={item.id} delay={index * 70}>
              <article className={`biz-seg biz-seg--lg biz-seg--${item.id}`}>
                <div className="biz-seg__art" aria-hidden="true">
                  <span className="biz-seg__icon">{item.icon}</span>
                  <span className="biz-seg__shape biz-seg__shape--a" />
                  <span className="biz-seg__shape biz-seg__shape--b" />
                  <span className="biz-seg__shape biz-seg__shape--c" />
                </div>
                <div className="biz-seg__body">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
