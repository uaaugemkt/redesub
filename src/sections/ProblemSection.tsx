import ConnectionDiagnosticCard from "../components/ConnectionDiagnosticCard";

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

        <ConnectionDiagnosticCard />

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
