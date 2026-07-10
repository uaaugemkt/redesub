import { useEffect, useRef } from "react";
import ConnectionDiagnosticCard from "../components/ConnectionDiagnosticCard";

const COMPACT_LAYOUT_QUERY = "(max-width: 1023px)";

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const mq = window.matchMedia(COMPACT_LAYOUT_QUERY);

    const setBarHidden = (hidden: boolean) => {
      if (!mq.matches) {
        document.body.classList.remove("has-problem-section-in-view");
        return;
      }
      document.body.classList.toggle("has-problem-section-in-view", hidden);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setBarHidden(entry.isIntersecting && entry.intersectionRatio >= 0.2);
      },
      { threshold: [0, 0.2, 0.35, 0.5], rootMargin: "0px 0px -56px 0px" }
    );

    observer.observe(el);

    const onLayoutChange = () => {
      if (!mq.matches) {
        document.body.classList.remove("has-problem-section-in-view");
      }
    };

    mq.addEventListener("change", onLayoutChange);

    return () => {
      observer.disconnect();
      mq.removeEventListener("change", onLayoutChange);
      document.body.classList.remove("has-problem-section-in-view");
    };
  }, []);

  return (
    <section ref={sectionRef} className="problem section" id="rotina-conectada">
      <div className="container">
        <header className="problem__header problem__header--desktop section__header section__header--center">
          <span className="eyebrow">O dia a dia conectado</span>
          <h2 className="section__title">
            O problema não é o seu celular.{" "}
            <span className="text-muted">
              É a internet que não acompanha sua rotina.
            </span>
          </h2>
        </header>

        <header className="problem__header problem__header--mobile">
          <span className="eyebrow">Antes e depois</span>
          <h2 className="problem__mobile-title">
            Uma conexão mais estável muda toda a rotina.
          </h2>
          <p className="problem__mobile-desc">
            Veja como trabalho, estudos e entretenimento podem fluir melhor com a
            RedeSub.
          </p>
        </header>

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
