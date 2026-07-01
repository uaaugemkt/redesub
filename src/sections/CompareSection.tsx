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
            <span className="compare__label compare__label--bad">Problema comum</span>
            <div className="compare__side-header">
              <span className="compare__icon compare__icon--bad" aria-hidden="true">
                <AlertIcon />
              </span>
              <h3>{COMPARE.bad.title}</h3>
            </div>
            <ul>
              {COMPARE.bad.items.map((item) => (
                <li key={item}>
                  <span className="compare__mark compare__mark--bad" aria-hidden="true">
                    ✕
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="compare__divider" aria-hidden="true">
            <span>VS</span>
          </div>

          <div className="compare__side compare__side--good">
            <span className="compare__label compare__label--good">Com a RedeSub</span>
            <div className="compare__side-header">
              <span className="compare__icon compare__icon--good" aria-hidden="true">
                <CheckIcon />
              </span>
              <h3>{COMPARE.good.title}</h3>
            </div>
            <ul>
              {COMPARE.good.items.map((item) => (
                <li key={item}>
                  <span className="compare__mark compare__mark--good" aria-hidden="true">
                    <CheckIcon />
                  </span>
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

function AlertIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M3 7l3 3 5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
