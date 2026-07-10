import { Link } from "react-router-dom";
import { MapPinIcon } from "../../components/icons/BenefitIcons";
import Reveal from "../../components/ui/Reveal";
import { REGIONS } from "../../lib/plans";

export default function AboutRegionalSection() {
  return (
    <section
      className="section section--soft about-regional"
      aria-labelledby="about-regional-title"
    >
      <div className="container">
        <Reveal>
          <header className="about-regional__header">
            <span className="eyebrow">Presença regional</span>
            <h2 className="section__title" id="about-regional-title">
              Conectados às comunidades que atendemos.
            </h2>
            <p className="section__desc">
              A atuação regional permite compreender melhor cada localidade, manter uma
              comunicação próxima e consultar a disponibilidade conforme o endereço
              informado.
            </p>
            <p className="about-regional__complement">
              Cada região possui características próprias. Por isso, a viabilidade e as
              condições de atendimento são confirmadas individualmente pela equipe
              RedeSub.
            </p>
          </header>
        </Reveal>

        <Reveal delay={70}>
          <div className="about-regional__panel">
            <ul className="about-regional__regions">
              {REGIONS.map((region, index) => (
                <li key={region.id}>
                  {index > 0 ? (
                    <div className="about-regional__region-divider" aria-hidden="true" />
                  ) : null}
                  <div className="about-regional__region">
                    <span className="about-regional__icon" aria-hidden="true">
                      <MapPinIcon />
                    </span>
                    <div>
                      <h3>{region.name}</h3>
                      <p>
                        {region.areaLabel ??
                          "Consulte disponibilidade e condições com a equipe."}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="about-regional__panel-cta">
              <Link to="/cobertura" className="btn btn--primary btn--md">
                Consultar cobertura
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
