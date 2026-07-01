import WhatsAppButton from "../components/WhatsAppButton";
import { ADDRESS, MAP } from "../lib/constants";
import { WHATSAPP_MESSAGES } from "../lib/whatsapp";

export default function LocalSection() {
  return (
    <section className="local section">
      <div className="container local__grid">
        <div className="local__content">
          <span className="eyebrow eyebrow--light">Atendimento de verdade</span>
          <h2 className="section__title section__title--light">
            Você fala com uma equipe que conhece a sua região.
          </h2>
          <p className="local__text">
            A RedeSub atende a Ilha de Outeiro com internet de fibra e suporte
            próximo, sem aquele atendimento distante que ninguém resolve.
          </p>

          <div className="local__region-badge">
            <span className="local__region-dot" />
            São João do Outeiro · Belém/PA
          </div>

          <ul className="local__highlights">
            <li>
              <strong>Atendimento local</strong>
              <span>Equipe que conhece a região</span>
            </li>
            <li>
              <strong>Suporte 7 dias</strong>
              <span>Todos os dias da semana</span>
            </li>
            <li>
              <strong>Consulta por endereço</strong>
              <span>Confirme disponibilidade na sua rua</span>
            </li>
          </ul>

          <p className="local__address">
            {ADDRESS.street}
            <br />
            {ADDRESS.neighborhood} · {ADDRESS.city}
          </p>

          <WhatsAppButton
            message={WHATSAPP_MESSAGES.availability}
            label="Consultar disponibilidade no meu endereço"
            variant="primary"
            size="lg"
            className="btn--hero"
          />
        </div>

        <div className="local__map">
          <div className="local__map-card">
            <iframe
              title="Localização RedeSub — São João do Outeiro, Belém/PA"
              src={MAP.embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="local__map-iframe"
            />
            <div className="local__map-footer">
              <div className="local__map-pin-label">
                <strong>RedeSub</strong>
                <span>Ilha de Outeiro · Belém/PA</span>
              </div>
              <a
                href={MAP.openUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--white btn--sm local__map-btn"
              >
                Abrir no Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
