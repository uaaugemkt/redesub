import { PROBLEM_TIMELINE } from "../lib/constants";

const ICONS: Record<string, string> = {
  video: "📹",
  school: "📚",
  tv: "📺",
  game: "🎮",
};

const PAIN_VARIANT: Record<string, string> = {
  Trava: "trava",
  Carregando: "carregando",
  Buffer: "buffer",
  "Ping alto": "ping",
};

export default function ProblemSection() {
  return (
    <section className="problem section">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="eyebrow">O dia a dia conectado</span>
          <h2 className="section__title">
            O problema não é o seu celular.{" "}
            <span className="text-muted">
              É a internet que não acompanha sua rotina.
            </span>
          </h2>
        </div>

        <div className="problem__timeline">
          {PROBLEM_TIMELINE.map((item, i) => (
            <div
              key={item.time}
              className="problem__moment"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="problem__moment-time">{item.time}</div>
              <div className="problem__moment-line" aria-hidden="true">
                <div className="problem__moment-dot" />
              </div>
              <div className="problem__moment-card">
                <span className="problem__moment-icon" aria-hidden="true">
                  {ICONS[item.icon]}
                </span>
                <div className="problem__moment-body">
                  <div className="problem__moment-head">
                    <h3>{item.title}</h3>
                    <span
                      className={`problem__pain-tag problem__pain-tag--${PAIN_VARIANT[item.pain] ?? "default"}`}
                    >
                      <span className="problem__pain-dot" aria-hidden="true" />
                      {item.pain}
                    </span>
                  </div>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="problem__closing">
          <p>
            Com a <strong>RedeSub</strong>, sua casa fica conectada para tudo
            acontecer ao mesmo tempo.
          </p>
          <span className="problem__tagline">
            Sua casa conectada sem disputa pelo Wi-Fi.
          </span>
        </div>
      </div>
    </section>
  );
}
