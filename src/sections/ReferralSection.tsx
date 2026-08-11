import { REFERRAL_URL } from "../lib/constants";

export default function ReferralSection() {
  return (
    <section className="referral">
      <div className="container referral__inner">
        <div className="referral__content">
          <span className="referral__icon" aria-hidden="true">🤝</span>
          <div>
            <h2>Indique e Ganhe</h2>
            <p>
              Indique a RedeSub e participe da nossa campanha de indicação.
            </p>
          </div>
        </div>
        <a
          href={REFERRAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--white btn--md"
        >
          Participar agora
        </a>
      </div>
    </section>
  );
}
