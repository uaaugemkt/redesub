import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "../lib/whatsapp";

export default function ReferralSection() {
  return (
    <section className="referral">
      <div className="container referral__inner">
        <div className="referral__content">
          <span className="referral__icon" aria-hidden="true">🤝</span>
          <div>
            <h2>Internet boa é indicada por quem já usa.</h2>
            <p>
              Indique um amigo e ganhe desconto na próxima mensalidade quando
              ele contratar pelo seu link.
            </p>
          </div>
        </div>
        <a
          href={buildWhatsAppLink(WHATSAPP_MESSAGES.referral)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--white btn--md"
        >
          Quero indicar um amigo
        </a>
      </div>
    </section>
  );
}
