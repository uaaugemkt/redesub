import { useState } from "react";
import { Link } from "react-router-dom";
import InternalPageHero from "../components/layout/InternalPageHero";
import Reveal from "../components/ui/Reveal";
import { SPEED_TEST_EMBED_URL, SPEED_TEST_URL } from "../config/integrations";
import { PAGE_META } from "../config/site";
import { usePageMeta } from "../hooks/usePageMeta";

type EmbedStatus = "loading" | "ready" | "blocked" | "unconfigured";

export default function SpeedTestPage() {
  usePageMeta(PAGE_META.velocidade);
  const [status, setStatus] = useState<EmbedStatus>(
    SPEED_TEST_EMBED_URL ? "loading" : "unconfigured"
  );

  return (
    <>
      <InternalPageHero
        eyebrow="Teste de velocidade"
        title="Confira a velocidade da sua internet"
        breadcrumbs={[
          { label: "Início", path: "/" },
          { label: "Teste de velocidade" },
        ]}
      />

      <section className="section">
        <div className="container container--narrow">
          <Reveal>
            {status === "unconfigured" && (
              <div className="speed-test-page__fallback" role="status">
                <h2>Teste de velocidade RedeSub</h2>
                <p>
                  Meça a velocidade da sua conexão no velocímetro oficial da
                  RedeSub.
                </p>
                <a
                  href={SPEED_TEST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary btn--md"
                >
                  Testar minha velocidade
                </a>
                <p className="speed-test-page__fallback-note">
                  <Link to="/">Voltar à página inicial</Link>
                </p>
              </div>
            )}

            {SPEED_TEST_EMBED_URL && (
              <div className="speed-test-page__embed-wrap">
                {status === "loading" && (
                  <p className="speed-test-page__loading" role="status">
                    Carregando teste de velocidade…
                  </p>
                )}
                {status === "blocked" && (
                  <div className="speed-test-page__fallback" role="alert">
                    <h2>Não foi possível carregar o teste</h2>
                    <p>O fornecedor não permite incorporação nesta página.</p>
                    <a
                      href={SPEED_TEST_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--primary btn--md"
                    >
                      Testar minha velocidade
                    </a>
                  </div>
                )}
                <iframe
                  title="Teste de velocidade da internet RedeSub"
                  src={SPEED_TEST_EMBED_URL}
                  className={`speed-test-page__iframe ${status === "ready" ? "speed-test-page__iframe--visible" : ""}`}
                  loading="lazy"
                  onLoad={() => setStatus("ready")}
                  onError={() => setStatus("blocked")}
                />
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
