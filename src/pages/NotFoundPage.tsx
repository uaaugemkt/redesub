import { Link } from "react-router-dom";
import { PAGE_META } from "../config/site";
import { usePageMeta } from "../hooks/usePageMeta";

export default function NotFoundPage() {
  usePageMeta(PAGE_META.notFound);

  return (
    <section className="section not-found">
      <div className="container not-found__inner">
        <p className="not-found__code" aria-hidden="true">
          404
        </p>
        <h1>Página não encontrada</h1>
        <p>
          O endereço que você acessou não existe ou foi movido. Volte ao início
          ou escolha uma das opções abaixo.
        </p>
        <div className="not-found__actions">
          <Link to="/" className="btn btn--primary btn--md">
            Ir para o início
          </Link>
          <Link to="/planos" className="btn btn--outline btn--md">
            Ver planos
          </Link>
          <Link to="/contato" className="btn btn--outline btn--md">
            Contato
          </Link>
        </div>
      </div>
    </section>
  );
}
