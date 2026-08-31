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
  image: string;
  imageAlt: string;
  size: "sm" | "lg";
}> = [
  {
    id: "pequenas",
    title: "Pequenas empresas",
    text: "Internet estável para atividades comerciais, sistemas e rotina administrativa.",
    icon: <RouterIcon />,
    image: "/media/empresa/segmentos/pequenas-empresas.webp",
    imageAlt: "Pequena empresa com equipe trabalhando",
    size: "sm",
  },
  {
    id: "grandes",
    title: "Grandes empresas",
    text: "Desempenho e estabilidade para operações com maior demanda.",
    icon: <GaugeIcon />,
    image: "/media/empresa/segmentos/grandes-empresas.webp",
    imageAlt: "Equipe em ambiente corporativo",
    size: "sm",
  },
  {
    id: "comercios",
    title: "Comércios",
    text: "Internet para atendimento, sistemas, vendas e operação do estabelecimento.",
    icon: <ShoppingCartIcon />,
    image: "/media/empresa/segmentos/comercios.webp",
    imageAlt: "Operação de comércio e atendimento",
    size: "sm",
  },
  {
    id: "restaurantes",
    title: "Restaurantes",
    text: "Conexão para sistemas, pagamentos, atendimento e rotina do negócio.",
    icon: <MapPinIcon />,
    image: "/media/empresa/segmentos/restaurantes.webp",
    imageAlt: "Restaurante em operação",
    size: "lg",
  },
  {
    id: "escritorios",
    title: "Escritórios e serviços",
    text: "Internet confiável para equipes, sistemas, arquivos e comunicação.",
    icon: <VideoIcon />,
    image: "/media/empresa/segmentos/escritorios-e-servicos.webp",
    imageAlt: "Profissionais trabalhando em escritório",
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
              Soluções para diferentes perfis de negócio
            </h2>
            <p className="biz-segments__desc">
              Internet empresarial adequada às necessidades de cada operação.
            </p>
          </header>
        </Reveal>

        <div className="biz-segments__top">
          {top.map((item, index) => (
            <Reveal key={item.id} delay={index * 55}>
              <article className={`biz-seg biz-seg--${item.id}`}>
                <div className="biz-seg__art">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="biz-seg__image"
                    width={640}
                    height={360}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="biz-seg__icon" aria-hidden="true">
                    {item.icon}
                  </span>
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
                <div className="biz-seg__art">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="biz-seg__image"
                    width={960}
                    height={432}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="biz-seg__icon" aria-hidden="true">
                    {item.icon}
                  </span>
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
