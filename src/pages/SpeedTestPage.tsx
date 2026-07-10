import { useEffect, useState } from "react";
import { SPEED_TEST_EMBED_URL } from "../config/integrations";
import Logo from "../components/Logo";

type EmbedStatus = "loading" | "ready" | "blocked" | "unconfigured";

export default function SpeedTestPage() {
  const [status, setStatus] = useState<EmbedStatus>(
    SPEED_TEST_EMBED_URL ? "loading" : "unconfigured"
  );

  useEffect(() => {
    document.title = "Teste de velocidade | RedeSub";
  }, []);

  return (
    <div className="speed-test-page">
      <header className="speed-test-page__header">
        <div className="container speed-test-page__header-inner">
          <a href="/" className="speed-test-page__logo" aria-label="RedeSub — voltar ao início">
            <Logo />
          </a>
          <a href="/" className="btn btn--outline btn--sm">
            Voltar ao site
          </a>
        </div>
      </header>

      <main className="speed-test-page__main section">
        <div className="container speed-test-page__container">
          <div className="section__header section__header--center">
            <span className="eyebrow">Ferramenta</span>
            <h1 className="section__title">Teste de velocidade</h1>
            <p className="section__desc">
              Meça a velocidade da sua conexão atual. O teste roda aqui no site,
              sem abrir nova aba.
            </p>
          </div>

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
                ambiente de deploy após validar políticas de embed (CSP /
                X-Frame-Options).
              </p>
              <a href="/" className="btn btn--primary btn--md">
                Voltar à página inicial
              </a>
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
                  <p>
                    O fornecedor não permite incorporação nesta página. Entre em
                    contato com o suporte se precisar de ajuda para medir sua
                    conexão.
                  </p>
                  <a href="/" className="btn btn--primary btn--md">
                    Voltar à página inicial
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
        </div>
      </main>
    </div>
  );
}
