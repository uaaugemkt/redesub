import { useState } from "react";
import { Link } from "react-router-dom";
import InternalPageHero from "../components/layout/InternalPageHero";
import Reveal from "../components/ui/Reveal";
import { SPEED_TEST_EMBED_URL } from "../config/integrations";
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
        eyebrow="Teste sua conexão"
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
                <h2>Indisponível temporariamente</h2>
                <p>
                  O teste de velocidade será integrado assim que a RedeSub
                  disponibilizar a URL oficial de incorporação (iframe permitido
                  pelo fornecedor).
                </p>
                <p className="speed-test-page__fallback-note">
                  Dependência: configure <code>VITE_SPEED_TEST_EMBED_URL</code> no
                  ambiente de deploy.
                </p>
                <Link to="/" className="btn btn--primary btn--md">
                  Voltar à página inicial
                </Link>
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
                    <Link
                      to="/atendimento#suporte-rapido"
                      className="btn btn--primary btn--md"
                    >
                      Falar com suporte
                    </Link>
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
