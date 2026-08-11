import { CircleCheckIcon } from "../../components/icons/BenefitIcons";
import Reveal from "../../components/ui/Reveal";

const POINTS = [
  "Alta velocidade",
  "Estabilidade",
  "Suporte especializado",
  "Soluções para empresas",
] as const;

const OFFICE_PHOTO = "/media/beneficios/Trabalhar-sem-interrupcoes.png";

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
                src={OFFICE_PHOTO}
                alt="Ambiente de trabalho conectado com internet RedeSub"
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
              Conectividade preparada para o ritmo da sua empresa
            </h2>
            <p className="biz-editorial__desc">
              Soluções de internet para apoiar a rotina de diferentes tipos de
              negócio com velocidade, estabilidade e suporte.
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
