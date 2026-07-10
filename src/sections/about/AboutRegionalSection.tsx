import { Link } from "react-router-dom";
import { MapPinIcon } from "../../components/icons/BenefitIcons";
import Reveal from "../../components/ui/Reveal";
import { REGIONS } from "../../lib/plans";

export default function AboutRegionalSection() {
  return (
    <section className="section about-regional" aria-labelledby="about-regional-title">
      <div className="container about-regional__grid">
        <Reveal>
          <span className="eyebrow">Presença regional</span>
          <h2 className="section__title" id="about-regional-title">
            Uma empresa conectada à região
          </h2>
          <p className="section__desc">
            A RedeSub atende localidades específicas e confirma a disponibilidade
            conforme o endereço. Essa atuação regional permite uma comunicação mais
            próxima e uma compreensão maior das necessidades dos clientes.
          </p>
          <Link to="/cobertura" className="btn btn--primary btn--md about-regional__cta">
            Consultar cobertura
          </Link>
        </Reveal>

        <ul className="about-regional__list">
          {REGIONS.map((region, index) => (
            <li key={region.id}>
              <Reveal delay={index * 70}>
                <article className="about-regional__card">
                  <span className="about-regional__icon" aria-hidden="true">
                    <MapPinIcon />
                  </span>
                  <div>
                    <h3>{region.name}</h3>
                    <p>
                      {region.areaLabel ??
                        "Consulte disponibilidade e planos com a equipe."}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
