import { COMPARE } from "../lib/constants";

export default function CompareSection() {
  return (
    <section className="compare section" id="beneficios">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="eyebrow">A diferença real</span>
          <h2 className="section__title">
            A diferença entre ter internet e ter tranquilidade
          </h2>
          <p className="section__desc">
            Internet rápida é bom. Internet estável é melhor ainda.
          </p>
        </div>

        <div className="compare__grid">
          <div className="compare__side compare__side--bad">
            <div className="compare__side-header">
              <span className="compare__icon compare__icon--bad" aria-hidden="true">✕</span>
              <h3>{COMPARE.bad.title}</h3>
            </div>
            <ul>
              {COMPARE.bad.items.map((item) => (
                <li key={item}>
                  <span className="compare__bullet compare__bullet--bad" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="compare__divider" aria-hidden="true">
            <span>VS</span>
          </div>

          <div className="compare__side compare__side--good">
            <div className="compare__side-header">
              <span className="compare__icon compare__icon--good" aria-hidden="true">✓</span>
              <h3>{COMPARE.good.title}</h3>
            </div>
            <ul>
              {COMPARE.good.items.map((item) => (
                <li key={item}>
                  <span className="compare__bullet compare__bullet--good" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
