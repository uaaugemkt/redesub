import { CircleCheckIcon } from "../../components/icons/BenefitIcons";
import Reveal from "../../components/ui/Reveal";

const POINTS = [
  "Alta velocidade",
  "Estabilidade",
  "Suporte especializado",
  "Soluções para empresas",
] as const;

const EDITORIAL_PHOTO = "/media/empresa/empresa-1.webp";

export default function BusinessEditorialSection() {
  return (
    <section
      className="biz-editorial section"
      aria-labelledby="business-editorial-title"
    >
      <div className="container">
        <div className="biz-editorial__layout">
          <Reveal className="biz-editorial__media">
            <figure className="biz-editorial__figure">
              <img
                src={EDITORIAL_PHOTO}
                alt="Ambiente empresarial conectado com internet RedeSub"
                className="biz-editorial__image"
                width={900}
                height={700}
                loading="lazy"
                decoding="async"
              />
            </figure>
          </Reveal>

          <Reveal className="biz-editorial__copy" delay={80}>
            <span className="eyebrow">Para o seu negócio</span>
            <h2 className="biz-editorial__title" id="business-editorial-title">
              Desempenho à altura das demandas da sua empresa
            </h2>
            <p className="biz-editorial__desc">
              Soluções de internet empresarial para apoiar atividades essenciais
              do negócio, com estabilidade, velocidade e suporte especializado.
            </p>
            <ul className="biz-editorial__list">
              {POINTS.map((item) => (
                <li key={item}>
                  <span className="biz-editorial__check" aria-hidden="true">
                    <CircleCheckIcon />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
