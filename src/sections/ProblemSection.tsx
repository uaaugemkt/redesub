import AutoCompareTimelineItem from "../components/AutoCompareTimelineItem";
import { PROBLEM_TIMELINE } from "../lib/constants";

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
          {PROBLEM_TIMELINE.map((item, index) => (
            <AutoCompareTimelineItem key={item.time} item={item} index={index} />
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
